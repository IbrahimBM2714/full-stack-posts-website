// // This is the database table
module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define("Likes", {});
  return Likes;
};
