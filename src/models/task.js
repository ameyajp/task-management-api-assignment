module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM('Todo', 'In Progress', 'Done'),
        defaultValue: 'Todo'
      },
      priority: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      },
      dueDate: {
        type: DataTypes.DATE
      }
    });
  
    return Task;
  };
  