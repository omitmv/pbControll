module.exports = class ClienteModel {
    constructor(
        cdCliente,
        tpCliente,
        cpfcnpj,
        rg,
        ie,
        flStatus,
        dtCadastro,
        nomeRsocial
    ) {
        this.cdCliente = cdCliente
        this.tpCliente = tpCliente
        this.cpfcnpj = cpfcnpj
        this.rg = rg
        this.ie = ie
        this.flStatus = flStatus
        this.dtCadastro = dtCadastro
        this.nomeRsocial = nomeRsocial
    }

    getCdCliente = function() {
        return this.cdCliente
    }

    setCdCliente = function(value) {
        this.cdCliente = value
    }

    getTpCliente = function() {
        return this.tpCliente
    }

    setTpCliente = function(value) {
        return (this.tpCliente = value)
    }

    getCpfcnpj = function() {
        return this.cpfcnpj
    }

    setCpfcnpj = function(value) {
        this.cpfcnpj = value
    }

    getRg = function() {
        return this.rg
    }

    setRg = function(value) {
        this.rg = value
    }

    getIe = function() {
        return this.ie
    }

    setIe = function(value) {
        this.ie = value
    }

    getFlStatus = function() {
        return this.flStatus
    }

    setFlStatus = function(value) {
        this.flStatus = value
    }

    getDtCadastro = function() {
        return this.dtCadastro
    }

    setDtCadastro = function(value) {
        this.dtCadastro = value
    }

    getNomeRsocial = function() {
        return this.nomeRsocial
    }

    setNomeRsocial = function(value) {
        this.nomeRsocial = value
    }
}