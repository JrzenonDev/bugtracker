const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('./bugtracker.json');

// id da planilha do drive
const doc =  new GoogleSpreadsheet('1QvsTZ5YEfSjgoUVD5_ci7AY5hs5CUtopWkeobkrJehA');
doc.useServiceAccountAuth(credentials, (err) => {
    if (err) {
        console.log('Não foi possível abrir a planilha');
    } else {
        console.log('Planilha aberta');
        doc.getInfo((err, info) => {
            const worksheet = info.worksheets[0];
            worksheet.addRow({ name: 'José' , email: 'teste@teste.com' }, err => {
                console.log('linha inserida');
            });
        })
    }
})
