const { poolQuery } = require("../utils/mariadb");
const { v4: uuidv4 } = require("uuid");

const getAll = async () => {
    const query = `SELECT product_id, product_name, type_name, product_price FROM product p JOIN type t ON p.type_id=t.type_id`;
    try {
        const result = await poolQuery(query);
        return result;
    } catch (err) {
        throw err;
    }
};

const isExist = async (productName, productSpec) => {
    let query;
    let params;
    query = `SELECT COUNT(*) AS count FROM product WHERE product_name = ? AND product_spec = ?`;
    params = [productName, productSpec];
    try{
        const result = await poolQuery(query, params);
        return result[0].count > 0;
    } catch (err) {
        throw err;
    }
};

const createType = async (typeName, userId) => {
    //check if typeName exist
    let query = `SELECT COUNT(*) AS count FROM type WHERE type_name = ? `;
    let params = [typeName];
    try {
        const typeIsExist = await poolQuery(query, params);
        if (typeIsExist[0].count > 0){
            // if typeName has existted, then get type_id
            query = `SELECT type_id FROM type WHERE type_name = ?`;
            params = [typeName];
            const result = await poolQuery(query, params);
            return result[0].type_id;
        } else{
            // typeName doesn't exist, create type and return type_id
            let typeId = uuidv4(); 
            query = `INSERT INTO type (type_id, user_id, type_name) VALUES (?, ?, ?)`;
            params = [typeId, userId, typeName];
            await poolQuery(query, params);
            return typeId;
        }
    } catch (err) {
        throw err;
    }
};

const create = async (product) => {
    const query = "INSERT INTO product SET ?";
    const params = [product];
    console.log();
    try {
        const result = await poolQuery(query, params);
        return result;
    } catch (err) {
        throw err;
    }
};

module.exports = { getAll, isExist, createType, create };