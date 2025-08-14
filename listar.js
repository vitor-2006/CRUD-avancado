const contatos = require('./array')
const {rl, askQuestion} = require('./readline')


async function listar() {
    // This loop allows editing multiple contacts.
    while (true) {
        if (contatos.length === 0) {
            console.log('Nenhum contato cadastrado!');
            // Exits the function to return to the main menu.
            return;
        }

        console.log('==== Lista de Contatos ====\n');
        contatos.forEach((contato, index) => {
            console.log(`${index + 1}. \nID: ${contato.id} \nNome: ${contato.nome} \nE-mail: ${contato.email}`);
            
            // Iterate directly over the telefone array
            contato.telefone.forEach((tel, i) => {
                console.log(`Telefone #${i + 1}: ${tel}`);
            });
            
            console.log('');
        });
        break
    }
}

module.exports = listar