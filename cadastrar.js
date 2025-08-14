const contatos = require('./array')
const {rl, askQuestion} = require('./readline')

async function cadastrar() {
    let resposta = 's';

    // We use a 'while' loop to let the user add multiple games.
    while (resposta.toLowerCase() === 's') {

        let nome = await askQuestion('Digite o nome de usuário: ');
        let email = await askQuestion('Digite o e-mail: ');
        // Use a single while loop to keep asking until the email is unique
        while (contatos.some(contato => contato.email === email)) {
            console.log('E-mail já utilizado! Tente novamente.');
            email = await askQuestion('Digite um novo e-mail: ');
        }
        let telefone = []
        let respostatel = 's'
        while (respostatel.toLowerCase() === 's'){
            // Prompt for the phone number
            let tel = await askQuestion('Digite o telefone: ');
            
            // Add the new phone number to the array
            telefone.push(tel);
            
            // Ask if the user wants to add another
            respostatel = await askQuestion('Deseja cadastrar outro telefone? (s/n): ');
        }

        let id = Date.now()
        const novoContato = { // Renamed for clarity
            nome,
            email,
            telefone,
            id
        };

        // This is the line that was corrected
        contatos.push(novoContato);
        console.log('Usuário registrado com sucesso!');

        // Ask the user if they want to add another game.
        resposta = await askQuestion('Deseja cadastrar outro usuário? (s/n): ')
    }

    // After the loop finishes (when the user says 'n'), return to the main menu.
    return
}

module.exports = cadastrar