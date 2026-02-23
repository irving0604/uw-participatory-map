const db = require("../config/database");

const { Parser } = require("json2csv");
const json2csvParser = new Parser();

/**
 * getRecords: Obtains all records
 */
exports.getRecord = async (req, res) => {
    const response = await db.query('SELECT * FROM "tblrecord" ORDER BY id ASC');
    const json = JSON.stringify(response);
    res.status(200).send(json);
};

/**
 * addRecord: Inserts user data into tblrecord
 */
exports.addRecord = async (req, res) => {
    let { contributor, content, shop_name, favorite_order, lat, lng } = req.body;

    console.log(
        'INSERT INTO "tblrecord"(contributor, content, shop_name, favorite_order, lat, lng) VALUES ($1, $2, $3, $4, $5, $6)',
        [contributor, content, shop_name, favorite_order, lat, lng]
    );

    let { recordRows } = await db.query(
        'INSERT INTO "tblrecord"(contributor, content, shop_name, favorite_order, lat, lng) VALUES ($1, $2, $3, $4, $5, $6)',
        [contributor, content, shop_name, favorite_order, lat, lng]
    );

    res.status(200).send({
        message: "record added into record table!",
        body: {
            record: {
                contributor,
                content,
                shop_name,
                favorite_order,
                lat,
                lng
            }
        }
    });
};
