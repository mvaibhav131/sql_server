const connectDB = require("../db");
const sql = require('mssql'); // Ensure you import the 'mssql' module here
const createMeter = require("../models/meterModal");

const getMeterByMid = async (req, res, next) => {
    const { mid } = req.query;
    try {
        const connectionPool = await connectDB();
        const request = new sql.Request(connectionPool);
        const query = 'SELECT * FROM l_meter WHERE mid = @mid';
        const result = await request.input('mid', sql.VarChar, mid).query(query);
        
        if (result && result.recordset.length > 0) {
            const meter = createMeter(result.recordset[0]);
            return res.json({ success: true, data: meter });
        } else {
            return res.status(404).json({ success: false, message: 'Meter record not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

module.exports = getMeterByMid;
