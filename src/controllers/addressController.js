const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler');
const AddressService = require('../services/addressService')

class AddressController {

    createAddress = async (req, res) => {
        const { cep, estado, pais, logradouro, bairro, cidade } = req.body;
        const user = req.user;

        try {
            let viaCepData = null;

            if (cep) {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                viaCepData = await response.json();
            }

            let entityId = null;
            if (user) {
                entityId = user.id;
            }

            if (!cep || (viaCepData && viaCepData.erro)) {
                const address = await AddressService.createAddress(logradouro, bairro, cidade, estado, pais, entityId);
                res.status(200).json({ Endereco: address });
            } else if (viaCepData && !viaCepData.erro) {
                const { logradouro: viaCepLogradouro, bairro: viaCepBairro, localidade: viaCepCidade } = viaCepData;
                const address = await AddressService.createAddress(viaCepLogradouro, viaCepBairro, viaCepCidade, estado, pais, entityId);
                res.status(200).json({ Endereco: address });
            } else {
                res.status(400).json({ msg: 'Erro ao processar o CEP' });
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res);
        }
    }
}

module.exports = new AddressController()