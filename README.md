# CRUD-avancado

Cadastro:
1. as informações do usuário são registradas usando await askQuestion
2. ID gerado com date.now()
3. emails não podem ser repetidos com 
    // loop fica perguntando até o e-mail ser único
   "while (contatos.some(contato => contato.email === email)) {
            console.log('E-mail já utilizado! Tente novamente.');
            email = await askQuestion('Digite um novo e-mail: ');
        }"
4. telefones podem ser adicionados várias vezes com
    "while (respostatel.toLowerCase() === 's'){
            // Prompt para o número de Telefone
            let tel = await askQuestion('Digite o telefone: ');
            
            // adiciona novo telefone na array
            telefone.push(tel);
            
            // pergunta se o usuário quer colocar outro telefone
            respostatel = await askQuestion('Deseja cadastrar outro telefone? (s/n): ');
        }"

Buscar:
1. todas as informações são listadas com
    "contatos.forEach((contato, index) => {
    console.log(`${index + 1}. \nID: ${contato.id} \nNome: ${contato.nome} \nE-mail: ${contato.email}`);"

2. os telefones são listados separadamentes usando
    "//lista de telefones associados com o usuário
    contato.telefone.forEach((tel, i) => {
        console.log(`Telefone #${i + 1}: ${tel}`);
    });"

Atualizar:
1. é editado a informação do usuário pelo o id com
    "const input = await askQuestion('Digite o id do contato que você quer editar: ');
        const index = contatos.findIndex(contato => contato.id == input);

        if (index !== -1) {
            console.log(`\nEditando contato de ${contatos[index].nome}...`);"
2. emails não podem ser repetidos com 
    "while (contatos.some((contato, i) => contato.email === email && i !== index)) {
                console.log('E-mail já utilizado! Tente novamente.');
                email = await askQuestion('Digite o novo e-mail: ');
            }"
3. a edição dos telefones é feita pela função telefone() que foi modularizada no arquivo telefone.js

Excluir:
1. a remoção é por id usando
    "const input = await askQuestion('Escolha o ID do usuário que deseja remover: ');

        // vê se o index é compatível com algum elemento da array
        const index = contatos.findIndex(contato => contato.id == input);

        // vê se teve algum elemento compatível (index não é -1)
        if (index !== -1) {"
2. a confirmação de exclusão é feita por
    "const confirm = await askQuestion('Tem certeza que quer remover o usuário? (s/n): ')
            if(confirm.toLowerCase() === 's'){
                const removedContato = contatos.splice(index, 1);
                console.log(`Contato "${removedContato[0].nome}" removido com sucesso!!\n`);
                break;
            }else{
                console.log('usuário não foi removido!')
                break
            }"

