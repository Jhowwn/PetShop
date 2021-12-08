import database from "../repository/configDb.js";

async function insertUser(email, password, usuario){
    const conn = await database.connect();
    const sql ="call sp_registra_user(?, ?, ?)"
    const newUserData = [email, password, usuario];
    conn.query(sql, newUserData);
    conn.end();
}

async function updateUser({email, password, usuario}, id){
    const conn = await database.connect();
    const sql ="call sp_atualiza_user(?, ?, ?, ?)";
    const newUserData = [id, email, password, usuario];
    conn.query(sql, newUserData);
    conn.end();
};

async function disableUser(id){
    const conn = await database.connect();
    const sql = `call sp_delete_user(${id})`;
    conn.query(sql);
    conn.end();
};

async function findUser(id){
    const conn = await database.connect();
    const sql = `call sp_acha_user(${id})`;
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
};

async function checkEmail(userEmail){
    const conn = await database.connect();
    const sql = "select * from vw_acha_user";
    const [rows] = await conn.query(sql, userEmail);
    conn.end();

    return rows;
}

export default {insertUser, updateUser, disableUser,findUser, checkEmail};