import crypto from 'crypto';

class Security {    

    public gerarSalt(tam: number){
        return crypto.randomBytes(Math.ceil(length/2))
                .toString('hex')
                .slice(0,tam); 
    }

    public sha512(senha:string , salt: string){
        const hash = crypto.createHmac('sha512', salt); // Algoritmo de cripto sha512
        hash.update(senha);
        const hash2 = hash.digest('hex');
        return {
            salt,
            hash2,
        };
    };

    public gerarSenha(senha: string) {
        var salt = this.gerarSalt(16); // Vamos gerar o salt
        var senhaESalt = this.sha512(senha, salt); // Pegamos a senha e o salt
        // A partir daqui você pode retornar a senha ou já salvar no banco o salt e a senha
        console.log('Senha Hash: ' + senhaESalt.hash2);
        console.log('Salt: ' + senhaESalt.salt);
        return senhaESalt;
    }

}

export default Security;