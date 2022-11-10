//Configuracao do Sequelize para o banco de forma mais simplificada

module.exports = {
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'root',
    database: 'bemfamiliaapi',
    port: '3306',
    define: {
        timestamps: true, //saber quando foi criado e atualizado
        underscored: true, //para os dados ficarem clinica_tal, video_tal
    },
};