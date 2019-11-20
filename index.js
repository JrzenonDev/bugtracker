const express = require('express');
const app = express();
const path = require('path');
const bodyPaser = require('body-parser');
const { promisefy } = require('util');

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

app.post('/', async(request, response) => {
    try{
        const doc = new GoogleSpreadSheet(docId)
        await promisify(doc.useServiceAccountAuth)(credentials)
        const info = await promisify(doc.getInfo)()
        const worksheet = info.worksheets[worksheetIndex]
        await promisify(worksheet.addRow)({
            name: request.body.name,
            email: request.body.email
        })
        response.send('bug reportado com sucesso')
    } catch (err) {
        response.send('erro ao enviar formulário')
        console.log(err)
    }
})

app.listen(3000, err => {
    if (err) {
        console.log('aconteceu um erro: ', err);
    } else {
        console.log('bugtracker rodando na porta http://localhost:3000');
    }
});