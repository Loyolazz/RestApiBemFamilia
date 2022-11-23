const { Model, DataTypes } = require('sequelize')

class Video extends Model {
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            descricao: DataTypes.STRING,
            localizacao: DataTypes.STRING,
            url: DataTypes.STRING,
            ativo: DataTypes.BOOLEAN

        },{
            sequelize,
            tableName: 'videos',
        })
    }

    static associate(models) {
        this.belongsToMany(models.Categoria, { foreignKey: 'video_id', through:'categoria_videos', as: 'categorias' }) //M/M through nome da tabela
        this.belongsToMany(models.Usuario, { foreignKey: 'video_id', through:'favoritos', as: 'usuarios' }) //M/M through nome da tabela
        this.belongsToMany(models.Usuario, { foreignKey: 'video_id', through: 'avaliacoes', as: 'comentarios' }) //M/M through nome da tabela



    }
}

module.exports = Video;