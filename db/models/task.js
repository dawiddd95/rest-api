'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};