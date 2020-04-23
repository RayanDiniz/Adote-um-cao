const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const pessoa = await connection('pessoa')
            .where('id', id)
            .select('name')
            .first();

        if (!pessoa) {
            return response.status(400).json({ error: 'Não foi encontrado usuario com esse ID' }); 
        }

        return response.json(pessoa);
    }
}