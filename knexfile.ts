module.exports = {    
    production: {
        client: 'pg',
        connection: {
            url: process.env.DATABASE_URL
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(__dirname,'dist','database','migrations')
        }
    }  
};
