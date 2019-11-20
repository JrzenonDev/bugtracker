const GoogleSpreadsheet = require('google-spreadsheet');
const credentials = require('./bugtracker.json');
const { promisify } = require('util');

const addRowToSheet = async() => {
    const doc =  new GoogleSpreadsheet('1QvsTZ5YEfSjgoUVD5_ci7AY5hs5CUtopWkeobkrJehA');
    await promisify(doc.useServiceAccountAuth)(credentials);
    console.log('planilha aberta');
    const info = await promisify(doc.getInfo)();
    const worksheet = info.worksheets[0];
    await promisify(worksheet.addRow)({ name: 'José' , email: 'teste@teste.com' });
}

addRowToSheet();

// id da planilha do drive
// const doc =  new GoogleSpreadsheet('1QvsTZ5YEfSjgoUVD5_ci7AY5hs5CUtopWkeobkrJehA');
// doc.useServiceAccountAuth(credentials, (err) => {
//     if (err) {
//         console.log('Não foi possível abrir a planilha');
//     } else {
//         console.log('Planilha aberta');
//         doc.getInfo((err, info) => {
//             const worksheet = info.worksheets[0];
//             worksheet.addRow({ name: 'José' , email: 'teste@teste.com' }, err => {
//                 console.log('linha inserida');
//             });
//         })
//     }
// })


