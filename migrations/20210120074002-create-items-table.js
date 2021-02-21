module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      phone_number: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('taskers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING(1200),
      },
      description: {
        type: Sequelize.STRING(1200),
      },
      rate: {
        type: Sequelize.INTEGER,
      },
      vehicle: {
        type: Sequelize.STRING,
      },
      num_of_completed_tasks: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
    await queryInterface.createTable('categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
    });
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      location: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      task_size: {
        type: Sequelize.STRING,
      },
      vehicle: {
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'users',
          key: 'id',
        },
      },
      tasker_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'taskers',
          key: 'id',
        },
      },
      date: {
        type: Sequelize.STRING,
      },
      completed: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tasks');
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('taskers');
    await queryInterface.dropTable('categories');
  },
};
