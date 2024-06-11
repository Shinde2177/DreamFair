    const express = require('express');
    const bodyParser = require('body-parser');
    const usersRoutes=require("./routes/adduser")
    const cors = require('cors');
    const app = express();
    const port = 1977;
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/users', usersRoutes);

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
