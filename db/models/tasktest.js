'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskTest = sequelize.define('TaskTest', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    done: DataTypes.BOOLEAN
  }, {});
  TaskTest.associate = function(models) {
    // associations can be defined here
  };
  return TaskTest;
};