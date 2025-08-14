const contatos = require('./array')
const {rl, askQuestion} = require('./readline')
const telefone = require('./telefone')


async function atualizar() {
    while (true) {
        if (contatos.length === 0) {
            console.log('Nenhum contato cadastrado!');
            return;
        }

        console.log('==== Atualizar Contato ====\n');
        contatos.forEach((contato, index) => {
            // Updated to print telephone array correctly
            console.log(`${index + 1}. \nID: ${contato.id} \nNome: ${contato.nome} \nE-mail: ${contato.email}`);
            contato.telefone.forEach((tel, i) => {
                console.log(`Telefone #${i + 1}: ${tel}`);
            });
            console.log('');
        });

        const input = await askQuestion('Digite o id do contato que você quer editar: ');
        const index = contatos.findIndex(contato => contato.id == input);

        if (index !== -1) {
            console.log(`\nEditando contato de ${contatos[index].nome}...`);
            
            const nome = await askQuestion('Digite o novo nome: ');
            let email = await askQuestion('Digite o novo e-mail: ');
            
            // Check for duplicate emails, excluding the current contact being edited
            while (contatos.some((contato, i) => contato.email === email && i !== index)) {
                console.log('E-mail já utilizado! Tente novamente.');
                email = await askQuestion('Digite o novo e-mail: ');
            }
            
            // Update the contact object.
            contatos[index].nome = nome;
            contatos[index].email = email;
            
            // Update the telefone array. You will need to write the `telefone()` function separately.
            await telefone(index);

            console.log(`Contato de ${contatos[index].nome} editado com sucesso!`);

            const resposta = await askQuestion('Deseja editar outro? (s/n): ');
            if (resposta.toLowerCase() !== 's') {
                break;
            }
        } else {
            console.log('ID inválido!\n');
        }
    }
}

module.exports = atualizar