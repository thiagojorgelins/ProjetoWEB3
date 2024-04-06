const { Address } = require('../database/models')
class AddressService{

    async createAddress(logradouro, bairro, cidade, estado, pais, entityId){
        const addressData = {
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            pais: pais,
            entityId: entityId,
            entityType: entityId ? 'User' : 'Company',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try {
            const address = await Address.create(addressData)
            return address;
        } catch (error) {
            throw error
        }
    }

    async getAddressByCEP(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            const addressData = await response.json()
            return addressData
        } catch (error) {
            throw error
        }
    }
    
    
}

module.exports = new AddressService()