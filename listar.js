const contatos = require('./array')
const {rl, askQuestion} = require('./readline')


async function listar() {
    if (contatos.length === 0) {
        console.log('Nenhum contato cadastrado!');
        // sai das função se tiver ninguém registrado
        return;
        }

    console.log('==== Lista de Contatos ====\n');
    contatos.forEach((contato, index) => {
        console.log(`${index + 1}. \nID: ${contato.id} \nNome: ${contato.nome} \nE-mail: ${contato.email}`);
            
        //lista de telefones associados com o usuário
        contato.telefone.forEach((tel, i) => {
            console.log(`Telefone #${i + 1}: ${tel}`);
        });
            
        console.log('');
    });
    return
}

module.exports = listar