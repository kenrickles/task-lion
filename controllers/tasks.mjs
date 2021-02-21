import pkg from 'sequelize';

export default function task(db) {
  const createTask = async (req, res) => {
    console.log(' post request to add new task');
    try {
      const {
        location, categoryId, description, taskerId, taskSize, vehicle, date, userId,
      } = req.body.createdTask;
      console.log(req.body.createdTask);
      const task = await db.Tasks.create(req.body.createdTask);
      console.log(task);
    }
    catch (error) {
      console.log(error);
    }
  };
  return {
    createTask,
  };
}
