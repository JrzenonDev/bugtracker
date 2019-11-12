const express = require('express');
const app = express();
const path = require('path');
const bodyPaser = require('body-parser');
const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('./bugtracker.json');

// Configurações
const docId = '1QvsTZ5YEfSjgoUVD5_ci7AY5hs5CUtopWkeobkrJehA';
const worksheetIndex = 0;


// app.set = seta variável ou propriedade
app.set('view engine', 'ejs');
// resolve o caminho do path (para cada browser)
app.set('views', path.resolve(__dirname, 'views'));

// Utiliza midleware | Pega o corpo da requisição e faz o parse
app.use(bodyPaser.urlencoded({ extended:true }))

app.get('/', (request, response) => {
    response.render('home');
});

app.post('/', (request, response) => {

    // id da planilha do drive
    const doc =  new GoogleSpreadsheet(docId);
    doc.useServiceAccountAuth(credentials, (err) => {
        if (err) {
            console.log('Não foi possível abrir a planilha');
        } else {
            console.log('Planilha aberta');
            doc.getInfo((err, info) => {
                const worksheet = info.worksheets[worksheetIndex];
                worksheet.addRow({ name: request.body.name, email: request.body.email, classificacao: request.body.issueType, como_reproduzir_erro: request.body.howToReproduce, saida_esperada: request.body.expectedOutput, saida_recebida: request.body.receivedOutput }, err => {
                    response.send('bug reportado com sucesso!');
                })
            })
        }
    })
})

app.listen(3000, err => {
    if (err) {
        console.log('aconteceu um erro: ', err);
    } else {
        console.log('bugtracker rodando na porta http://localhost:3000');
    }
});