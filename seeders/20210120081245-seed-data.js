// import seed data
const seedData = require('../utilities/seed-data');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const {
      categoriesList, usersList, taskersList,
    } = seedData;

    try {
      await queryInterface.bulkInsert('categories', categoriesList);
      await queryInterface.bulkInsert('users', usersList);
      await queryInterface.bulkInsert('taskers', taskersList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('tasker', null, {});
  },
};
