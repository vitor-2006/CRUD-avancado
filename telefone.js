const contatos = require('./array')
const {rl, askQuestion} = require('./readline')

// The function now takes an 'index' argument to know which contact to modify.
async function telefone(index) {
    while (true) {
        // Corrected to use a string comparison in the switch statement.
        const op = await askQuestion('O que desejas fazer? \n1. Adicionar telefone \n2. Remover telefone\n3. Voltar ao menu principal\n');

        switch (op) {
            case '1':
                const input = await askQuestion('Digite o novo telefone: ');
                // Use the provided index to access the correct contact's telefone array.
                contatos[index].telefone.push(input);
                console.log('Telefone adicionado com sucesso!');
                break;

            case '2':
                // Check if there are any phone numbers to remove.
                if (contatos[index].telefone.length === 0) {
                    console.log('Nenhum telefone para remover.');
                    break;
                }
                
                console.log('Telefones cadastrados:');
                // Use forEach to list the phone numbers cleanly.
                contatos[index].telefone.forEach((tel, i) => {
                    console.log(`\nTelefone #${i + 1}: ${tel}`);
                });

                const rem = await askQuestion("\nQual telefone será removido?: ");
                const remIndex = parseInt(rem, 10) - 1; 

                // Validate the input to ensure it's a valid index.
                if (remIndex >= 0 && remIndex < contatos[index].telefone.length) {
                    contatos[index].telefone.splice(remIndex, 1);
                    console.log('Telefone removido com sucesso!');
                } else {
                    console.log('Número de telefone inválido!');
                }
                break;
            
            case '3':
                return; // Exit the function to return to the main menu.

            default:
                console.log('Operação inválida! Tente novamente.');
                break;
        }

        const continueOp = await askQuestion('\nDeseja fazer outra operação com telefones? (s/n): ');
        if (continueOp.toLowerCase() !== 's') {
            break;
        }
    }
}
module.exports = telefone