export default function taskersModel(sequelize, DataTypes) {
  return sequelize.define(
    'tasker',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      location: {
        type: DataTypes.STRING(1200),
      },
      description: {
        type: DataTypes.STRING(1200),
      },
      rate: {
        type: DataTypes.INTEGER,
      },
      vehicle: {
        type: DataTypes.STRING,
      },
      numOfCompletedTasks: {
        type: DataTypes.INTEGER,
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
