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
            contato.telefone.forEach((tel, i) => {
                console.log(`Telefone #${i + 1}: ${tel}`);
            });
            console.log('');
        });

        const input = await askQuestion('Escolha o ID do usuário que deseja remover: ');

        // vê se o index é compatível com algum elemento da array
        const index = contatos.findIndex(contato => contato.id == input);

        // vê se teve algum elemento compatível (index não é -1)
        if (index !== -1) {
            // usa o index para remover o usuário
            const confirm = await askQuestion('Tem certeza que quer remover o usuário? (s/n): ')
            if(confirm.toLowerCase() === 's'){
                const removedContato = contatos.splice(index, 1);
                console.log(`Contato "${removedContato[0].nome}" removido com sucesso!!\n`);
                break;
            }else{
                console.log('usuário não foi removido!')
                break
            }
        } else {
            console.log('ID inválido! Por favor, digite um ID válido.');
        }
    }
}

module.exports = excluir