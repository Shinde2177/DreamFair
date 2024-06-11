const express = require('express');
const router = express.Router();
const connection = require('../db/connection');

router.post('/', (req, res) => {
    const { email, password, first_name, last_name, phone_number, role, address } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    const query = `
        INSERT INTO Users (email, password, first_name, last_name, phone_number, role, address)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [email, password, first_name, last_name, phone_number, role, address], (err, results) => {
        if (err) {
            console.error('Error inserting user into the database:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
});

module.exports = router;

