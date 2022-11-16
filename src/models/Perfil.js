const { Model, DataTypes } = require('sequelize');

class Perfil extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN,
        },{
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarios'});

    }
}

module.exports = Perfil;