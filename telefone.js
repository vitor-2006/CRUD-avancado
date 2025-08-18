const contatos = require('./array')
const {rl, askQuestion} = require('./readline')

// função utiliza'index' para saber qual contato é para editar.
async function telefone(index) {
    while (true) {
        const op = await askQuestion('O que desejas fazer? \n1. Adicionar telefone \n2. Remover telefone\n3. Voltar\n');

        switch (op) {
            case '1':
                const input = await askQuestion('Digite o novo telefone: ');
                // usa o 'index' para saber qual posição da array paar editar'
                contatos[index].telefone.push(input);
                console.log('Telefone adicionado com sucesso!');
                break;

                case '2':
                    // vê se tem algum telefone para remover
                    if (contatos[index].telefone.length === 0) {
                        console.log('Nenhum telefone para remover.');
                        break;
                    }
                
                    console.log('Telefones cadastrados:');
                    // usa forEach para mostrar todos os telefones.
                    contatos[index].telefone.forEach((tel, i) => {
                        console.log(`\nTelefone #${i + 1}: ${tel}`);
                    });
                
                    const remInput = await askQuestion("\nQual telefone será removido? Digite o número ou o índice (#): ");
                    
                    let remIndex = parseInt(remInput, 10) - 1; 
                    let removed = false;
                
                    if (!isNaN(remIndex) && remIndex >= 0 && remIndex < contatos[index].telefone.length) {
                        // vê se o input é válido
                        contatos[index].telefone.splice(remIndex, 1);
                        removed = true;
                    } else {
                        // se o usuário digitou o número de telefone em sí
                        const phoneIndex = contatos[index].telefone.indexOf(remInput);
                        if (phoneIndex !== -1) {
                            contatos[index].telefone.splice(phoneIndex, 1);
                            removed = true;
                        }
                    }
                    
                    if (removed) {
                        console.log('Telefone removido com sucesso!');
                    } else {
                        console.log('Número de telefone inválido ou não encontrado!');
                    }
                    break;
            
            case '3':
                return; // volta para a função atualizar

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