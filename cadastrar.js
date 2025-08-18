const contatos = require('./array')
const {rl, askQuestion} = require('./readline')

async function cadastrar() {
    let resposta = 's';

    // while é usado para conseguir registrar mais deum usuário.
    while (resposta.toLowerCase() === 's') {

        let nome = await askQuestion('Digite o nome de usuário: ');
        let email = await askQuestion('Digite o e-mail: ');
        // loop fica perguntando até o e-mail ser único
        while (contatos.some(contato => contato.email === email)) {
            console.log('E-mail já utilizado! Tente novamente.');
            email = await askQuestion('Digite um novo e-mail: ');
        }
        let telefone = []
        let respostatel = 's'
        while (respostatel.toLowerCase() === 's'){
            // Prompt para o número de Telefone
            let tel = await askQuestion('Digite o telefone: ');
            
            // adiciona novo telefone na array
            telefone.push(tel);
            
            // pergunta se o usuário quer colocar outro telefone
            respostatel = await askQuestion('Deseja cadastrar outro telefone? (s/n): ');
        }

        let id = Date.now()
        const novoContato = {
            nome,
            email,
            telefone,
            id
        };

        contatos.push(novoContato);
        console.log('Usuário registrado com sucesso!');

        // pergunta para poder repetir o while loop.
        resposta = await askQuestion('Deseja cadastrar outro usuário? (s/n): ')
    }

    //retorna quando o  usuário digitar algo além de s
    return
}

module.exports = cadastrar