const { Address } = require('../database/models')
class AddressService{

    async createAddress(logradouro, bairro, cidade, estado, pais, userId){
        const addressData = {
            logradouro: logradouro,
            bairro: bairro,
            cidade: cidade,
            estado: estado,
            pais: pais,
            userId: userId
        }
        try {
            const address = await Address.create(addressData)
            return address
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
    
    async editAddress(id, logradouro, bairro, cidade, estado, pais) {
        try {
            const addressData = {
                logradouro: logradouro,
                bairro: bairro,
                cidade: cidade,
                estado: estado,
                pais: pais,
                updatedAt: new Date()
            }
            const address = await Address.update(addressData, { where: { id: id } })
            return address
        } catch (error) {
            throw error
        }
    }

    async deleteAddress(id) {
        try {
            const address = await Address.destroy({ where: { id: id } })
            return address
        } catch (error) {
            throw error
        }
    }
}

module.exports = new AddressService()