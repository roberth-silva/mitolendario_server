"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = __importDefault(require("crypto"));
var Security = /** @class */ (function () {
    function Security() {
    }
    Security.prototype.gerarSalt = function (tam) {
        return crypto_1.default.randomBytes(Math.ceil(length / 2))
            .toString('hex')
            .slice(0, tam);
    };
    Security.prototype.sha512 = function (senha, salt) {
        var hash = crypto_1.default.createHmac('sha512', salt); // Algoritmo de cripto sha512
        hash.update(senha);
        var hash2 = hash.digest('hex');
        return {
            salt: salt,
            hash2: hash2,
        };
    };
    ;
    Security.prototype.gerarSenha = function (senha) {
        var salt = this.gerarSalt(16); // Vamos gerar o salt
        var senhaESalt = this.sha512(senha, salt); // Pegamos a senha e o salt
        // A partir daqui você pode retornar a senha ou já salvar no banco o salt e a senha
        console.log('Senha Hash: ' + senhaESalt.hash2);
        console.log('Salt: ' + senhaESalt.salt);
        return senhaESalt;
    };
    return Security;
}());
exports.default = Security;
