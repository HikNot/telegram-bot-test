const {
  Model,
} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Key extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(Users) {
      // this.belongsTo(Users, { foreignKey: "user_id" });
    }
  }
  Key.init({
    key: DataTypes.STRING,
    userKey_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: "Key",
  });
  return Key;
};
