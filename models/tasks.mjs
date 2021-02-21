export default function tasksModel(sequelize, DataTypes) {
  return sequelize.define(
    'tasks',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
      location: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      vehicle: {
        type: DataTypes.STRING,
      },
      taskSize: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        reference: {
          model: 'users',
          key: 'id',
        },
      },
      taskerId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'taskers',
          key: 'id',
        },
      },
      date: {
        type: DataTypes.STRING,
      },
      completed: {
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
