const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const pessoa_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('pessoa_id', pessoa_id)
            .select('*');

        return response.json(incidents);
    }
}