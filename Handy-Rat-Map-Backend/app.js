const express = require("express");
const app = express();
const CompanyRoute = require("./routes/companys.js");
var cors = require('cors')
const DataBaseURL = "mongodb+srv://demo:46rGdntBjSsx9H60@cluster0.tr7ng.mongodb.net/Companys?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');
const client = new MongoClient(DataBaseURL);

// mongoose.connect(DataBaseURL,
//     { useNewUrlParser: true },
//     () => {
//         console.log("connected to database!");
//     }
// )


const main = async () => {
    try {
        await client.connect();
    } catch (e) {
        console.log(e);
    }
    console.log('Connected successfully to DataBase');

    app.use(cors())
    app.use(express.json({ limit: '10mb' }));
    app.use('/Company', CompanyRoute);

    app.listen(3001, () => { console.log("Server Start") })
}
main();
// .catch(console.error());
