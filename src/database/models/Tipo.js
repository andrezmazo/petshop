module.exports = (sequelize, dataTypes) => {
  const alias = "Tipo";

  const cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: dataTypes.STRING(100),
      notNull: false,
    },
  };

  const config = {
    tableName: "tipo_producto",
    underscored: true,
    timestamps: false,
    paranoid: false,
  };

  const Tipo = sequelize.define(alias, cols, config);

  Tipo.associate = (models) => {
    Tipo.hasMany(models.Producto, {
      as: "productos",
      foreignKey: "tipo_id",
    });
  };

  return Tipo;
};
