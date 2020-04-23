const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('pessoa', 'pessoa_id', '=', 'incidents.pessoa_id')
        .limit(5)
        .offset((page -1) * 5)
        .select([
            'incidents.*', 
            'pessoa.name', 
            'pessoa.email', 
            'pessoa.whatsapp', 
            'pessoa.city', 
            'pessoa.uf'
        ]);

    response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, img, value } = request.body;
        const pessoa_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            img,
            value,
            pessoa_id,
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const pessoa_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('pessoa_id')
            .first();

        if (incident.pessoa_id != pessoa_id) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};