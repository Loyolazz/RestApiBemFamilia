const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            login: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize
        })
    }
    static associate(models) {
        this.hasMany(models.Perfil, { foreignKey: 'usuario_id', as: 'perfils'});

    }
}

module.exports = Usuario;