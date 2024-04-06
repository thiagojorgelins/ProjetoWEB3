const sequelizeErrorHandler = require('../middlewares/sequelizeErrorHandler');
const AddressService = require('../services/addressService')

class AddressController {

    createAddress = async (req, res) => {
        const { cep, estado, pais, logradouro, bairro, cidade } = req.body
        const user = req.user
        try {
            let viaCepData = null
            if (cep) {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
                viaCepData = await response.json();
            }
            let userId = null
            if (user) {
                userId = user.id
                if (!cep || (viaCepData && viaCepData.erro)) {
                    const address = await AddressService.createAddress(logradouro, bairro, cidade, estado, pais, userId)
                    res.status(200).json({ Endereco: address })
                } else if (viaCepData && !viaCepData.erro) {
                    const { logradouro, bairro, localidade } = viaCepData;
                    const address = await AddressService.createAddress(logradouro, bairro, localidade, estado, pais, userId)
                    res.status(200).json({ Endereco: address });
                } else {
                    res.status(400).json({ msg: 'Erro ao processar o CEP' })
                }
            }
        } catch (error) {
            sequelizeErrorHandler(error, req, res)
        }
    }
}

module.exports = new AddressController()