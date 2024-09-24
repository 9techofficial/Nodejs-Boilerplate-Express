import express from 'express';
import { apiLog, logInfo } from '../utilities/logger';

export default class BaseController {
  protected model: any;
  protected services: any;

  constructor(model: any, services: any) {
    this.model = model;
    this.services = services;
  }

  // Find all records
  async findAll(req: express.Request, res: express.Response) {
    apiLog.info('Fetching all records from path: ' + req.url);
    try {
      // Destructure query parameters
      type Tquery = { sort?: string; page?: number; limit?: number; filters?: string };
      let { sort, page = 1, limit = 25, filters } = req.query as Tquery

      // Manage limit
      limit = limit > 100 ? 100 : limit;

      // Parse sort and filters if they exist
      let filterObj: any = {};
      if (filters) {
        try {
          const parsedFilters = JSON.parse(filters); // Parse the filters string
          parsedFilters.forEach((filter: { field: string; value: string | boolean | number }) => {
            filterObj[filter.field] = filter.value;
          });
        } catch (err) {
          logInfo.error('Invalid filter format: ' + filters);
        }
      }

      let sortObj: any = {};
      if (sort) {
        try {
          const parsedSort = JSON.parse(sort); // Parse the sort string
          parsedSort.forEach(([field, order]: [string, number]) => {
            sortObj[field] = order;
          });
        } catch (err) {
          logInfo.error('Invalid sort format: ' + sort);
        }
      }

      // calculate pagination values
      const skip = (page - 1) * limit;
      const total = await this.services.count(filterObj);
      const pages = Math.ceil(total / limit);

      // check if page is out of range      
      if (total > 0 && page > pages) return res.status(404).send({ error: 'Page not found' });

      // return paginated records
      const data = await this.services.findAll(filterObj, sortObj, skip, limit);
      res.send({ data, pagination: { total, page, pages, limit } });
    } catch (err) {
      apiLog.error('Failed to fetch records from path: ' + req.url + ' Error: ' + JSON.stringify(err));
      res.status(500).send({ error: 'Failed to fetch records' });
    }
  }

  // Find one record by ID
  async findOne(req: express.Request, res: express.Response) {
    const { id } = req.params as { id: string };
    apiLog.info('Fetching record by ID: ' + id + ' from path: ' + req.url);
    try {
      const data = await this.services.findById(id);
      if (data) {
        res.send({ data });
      } else {
        res.status(404).send({ error: 'Record not found' });
      }
    } catch (err) {
      apiLog.error('Failed to fetch record by ID: ' + id + ' from path: ' + req.url + ' Error: ' + JSON.stringify(err));
      res.status(500).send({ error: 'Failed to fetch record' });
    }
  }

  // Create a new record
  async create(req: express.Request, res: express.Response) {
    apiLog.info('Creating a new record from path: ' + req.url);
    try {
      const newRecord = await this.services.create(req.body);
      res.status(201).send({ data: newRecord });
    } catch (err) {
      apiLog.error('Failed to create a new record from path: ' + req.url + ' Error: ' + JSON.stringify(err));
      res.status(500).send({ error: 'Failed to create record' });
    }
  }

  // Update a record by ID
  async update(req: express.Request, res: express.Response) {
    const { id } = req.params as { id: string };
    apiLog.info('Updating record by ID: ' + id + ' from path: ' + req.url);
    try {
      const updatedRecord = await this.services.update(id, req.body);
      if (updatedRecord) {
        res.send({ data: updatedRecord });
      } else {
        res.status(404).send({ error: 'Record not found' });
      }
    } catch (err) {
      apiLog.error('Failed to update record by ID: ' + id + ' from path: ' + req.url + ' Error: ' + JSON.stringify(err));
      res.status(500).send({ error: 'Failed to update record' });
    }
  }

  // Delete a record by ID
  async delete(req: express.Request, res: express.Response) {
    const { id } = req.params as { id: string };
    apiLog.info('Deleting record by ID: ' + id + ' from path: ' + req.url);
    try {
      const deletedRecord = await this.services.delete(id);
      if (deletedRecord) {
        res.send({ message: 'Record deleted successfully' });
      } else {
        res.status(404).send({ error: 'Record not found' });
      }
    } catch (err) {
      apiLog.error('Failed to delete record by ID: ' + id + ' from path: ' + req.url + ' Error: ' + JSON.stringify(err));
      res.status(500).send({ error: 'Failed to delete record' });
    }
  }
}
