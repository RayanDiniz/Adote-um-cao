const connection = require('../database/connection');

const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const pessoa = await connection('pessoa').select('*');
    
        return response.json(pessoa);
    },

    async create(request, response) {
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('pessoa').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({ id });
    }
};