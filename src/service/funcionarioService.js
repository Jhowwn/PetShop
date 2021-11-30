import database from '../repository/configDb.js';

async function insertFuncionario({nome, cpf}){
    const conn = await database.connect();
    const sql = "call sp_insere_funcionario (?, ?)";
    const newFunci = [nome, cpf];
    conn.query(sql, newFunci);
    conn.end();
};

async function updateFuncionario({nome, cpf, id}){
    const conn = await database.connect();
    const sql = 'CALL sp_update_funcionario(?,?,?);'
    const updtFunci = [
        nome,
        cpf,
        id
    ];
    conn.query(sql, updtFunci);
    conn.end();
}

export default {insertFuncionario, updateFuncionario};