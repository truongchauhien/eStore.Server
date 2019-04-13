import express = require('express')

const PORT:number = Number.parseInt(process.env.NODE_ENV || '3000');
const app = express();

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
