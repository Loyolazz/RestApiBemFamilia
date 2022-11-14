const { Model, DataTypes } = require('sequelize');
const dataTypes = require('sequelize/lib/data-types');

class Perfil extends Model {
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            ativo: dataTypes.STRING,
        },{
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Usuario, { foreignKey: 'usuario_id', as: 'usuarios'});

    }
}

module.exports = Perfil;