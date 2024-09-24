import express from 'express';

export default async function baseRoutes(router: express.Router, routeName: string, controller: any, isAuth?: any | undefined): Promise<void> {
  // Dynamically import the controller module
  const importController = await import(`../controllers/${controller}.ts`);
  const controllerModule = importController.default;

  // check if route is authenticate
  if (typeof isAuth == 'function') router.use(`/${routeName}`, isAuth);

  // index route  
  router.get(`/${routeName}`, async (req, res) => {
    await controllerModule.findAll(req, res);
  });

  // create route
  router.post(`/${routeName}`, async (req, res) => {
    await controllerModule.create(req, res);
  });

  // show route
  router.get(`/${routeName}/:id`, async (req, res) => {
    await controllerModule.findOne(req, res);
  });

  // update route
  router.put(`/${routeName}/:id`, async (req, res) => {
    await controllerModule.update(req, res);
  });

  // delete route
  router.delete(`/${routeName}/:id`, async (req, res) => {
    await controllerModule.delete(req, res);
  });
}
