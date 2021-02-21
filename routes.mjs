import { request } from 'http';
import { resolve } from 'path';
import users from './controllers/users.mjs';
import tasks from './controllers/tasks.mjs';
import categories from './controllers/categories.mjs';
import taskers from './controllers/taskers.mjs';
import checkAuthMiddleware from './utilities/auth.mjs';

import db from './models/index.mjs';

export default function routes(app) {
  const checkAuth = checkAuthMiddleware(db);
  const UsersController = users(db);
  const TasksController = tasks(db);
  const CategoriesController = categories(db);
  const TaskersController = taskers(db);
  // special JS page. Include the webpack index.html file
  app.get('/dashboard', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });
  app.get('/home', (request, response) => {
    response.render('home');
  });
  // render login page
  app.get('/login', (request, response) => {
    response.render('login');
  });
  //  post request to verify user
  app.post('/login', UsersController.login);

  // render registartion page
  app.get('/register', UsersController.getRegistrationPage);
  // post request to register
  app.post('/register', UsersController.register);

  app.post('/newTask', TasksController.createTask);

  app.get('/categories', CategoriesController.getCategories);
  app.get('/taskers', TaskersController.getTaskers);
}
