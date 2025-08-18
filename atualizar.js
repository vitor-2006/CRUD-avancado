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
            console.log(`${index + 1}. \nID: ${contato.id} \nNome: ${contato.nome} \nE-mail: ${contato.email}`);
            contato.telefone.forEach((tel, i) => {
                console.log(`Telefone #${i + 1}: ${tel}`);
            });
            console.log('');
        });

        const input = await askQuestion('Digite o ID do contato que você quer editar: ');
        const index = contatos.findIndex(contato => contato.id == input);

        if (index !== -1) {
            console.log(`\nEditando contato de ${contatos[index].nome}...`);

            // Check if user wants to update the name
            const editName = await askQuestion('Deseja editar o nome? (s/n): ');
            if (editName.toLowerCase() === 's') {
                const nome = await askQuestion('Digite o novo nome: ');
                contatos[index].nome = nome;
            }

            // Check if user wants to update the email
            const editEmail = await askQuestion('Deseja editar o e-mail? (s/n): ');
            if (editEmail.toLowerCase() === 's') {
                let email = await askQuestion('Digite o novo e-mail: ');
                
                // Check if the email is already in use by another contact
                while (contatos.some((contato, i) => contato.email === email && i !== index)) {
                    console.log('E-mail já utilizado! Tente novamente.');
                    email = await askQuestion('Digite o novo e-mail: ');
                }
                contatos[index].email = email;
            }

            // Call the telefone function to manage phones
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