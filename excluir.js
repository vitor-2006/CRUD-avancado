const contatos = require('./array')
const {rl, askQuestion} = require('./readline')

async function excluir() {
    console.log('==== Remover Contato ====\n');

    if (contatos.length === 0) {
        console.log('Nenhum contato cadastrado!');
        return;
    }

    while (true) {
        console.log('Contatos disponíveis: ');
        contatos.forEach((contato, index) => {
            console.log(`${index + 1}. \nID: ${contato.id} \nNome: ${contato.nome} \nE-mail: ${contato.email}`);
            // Correctly display the telephone array
            contato.telefone.forEach((tel, i) => {
                console.log(`Telefone #${i + 1}: ${tel}`);
            });
            console.log('');
        });

        const input = await askQuestion('Escolha o ID do usuário que deseja remover: ');

        // Find the index of the contact with the matching ID
        const index = contatos.findIndex(contato => contato.id == input);

        // If a matching contact is found (index is not -1)
        if (index !== -1) {
            // Use the index to remove the contact
            const removedContato = contatos.splice(index, 1);
            console.log(`Contato "${removedContato[0].nome}" removido com sucesso!!\n`);
            break; // Exit the loop on success
        } else {
            console.log('ID inválido! Por favor, digite um ID válido.');
        }
    }
}

module.exports = excluir