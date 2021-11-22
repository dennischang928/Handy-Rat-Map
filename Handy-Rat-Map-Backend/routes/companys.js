const express = require("express")
const router = express.Router()
// const DataBaseURL = "mongodb+srv://DennisChang:9A59BbpbKC3AY8f@cluster0.tr7ng.mongodb.net/Companys?retryWrites=true&w=majority";
const DataBaseURL = "mongodb+srv://DennisChang:9A59BbpbKC3AY8f@cluster0.tr7ng.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const { MongoClient } = require('mongodb');
const client = new MongoClient(DataBaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require('cors')


router.post('/CreateCompany', cors(), async (req, res) => {
    console.log("CreatingCompany");
    await client.connect();

    const result = await CreateCompany(client, req.body);
    res.sendStatus(200);
    // res.send(`Create Company success, Company ID: ${result.insertedId}`);
})

router.get('/SurroundingCompany', cors(), async (req, res) => {
    var Lng = parseFloat(req.query.Lng);
    var Lat = parseFloat(req.query.Lat);

    if (Lng === undefined || Lat === undefined) {
        res.send("Please give me Lng and Lat param");
        return;
    }

    await client.connect();
    var Range = 1;

    let MaxLng = Lng + (Range / 2);
    let MinLng = Lng - (Range / 2);
    let MaxLat = Lat + (Range / 2);
    let MinLat = Lat - (Range / 2);

    const result = await FindSurroundingCompany(client, MaxLng, MaxLat, MinLng, MinLat);
    res.send(result);
})

router.get('/GetCompanyImage', cors(), async (req, res) => {
    await client.connect();
    const result = await GetCompanyImageSrc(client, req.query.id);
    res.send(result);
})


const GetCompanyImageSrc = async (client, id) => {
    const result = await client.db("Companys").collection("ImageSrc").findOne({ shopid: { $eq: id } })
    return result;
}


const FindSurroundingCompany = async (client, MaxLng, MaxLat, MinLng, MinLat) => {
    const pipeline = [
        {
            '$match': {
                'Lat': {
                    '$gte': MinLat
                },
                'Lng': {
                    '$gte': MinLng
                }
            }
        }, {
            '$match': {
                'Lat': {
                    '$lte': MaxLat
                },
                'Lng': {
                    '$lte': MaxLng
                }
            }
        }
    ];

    const cursor = await client.db("Companys").collection("CompanysDetail").aggregate(pipeline);
    let result = [];
    var i = 0;
    await cursor.forEach((element) => {
        result[i] = element;
        i++;
    });
    console.log(result);
    return result;
}


const CreateCompany = async (client, newCompany) => {
    let newCompanyCP = JSON.parse(JSON.stringify(newCompany));
    delete newCompanyCP.ImageSrc;

    const result = await client.db("Companys").collection("CompanysDetail").insertOne(newCompanyCP);
    const ImageResult = await client.db("Companys").collection("ImageSrc").insertOne({ ImageSrc: newCompany.ImageSrc, shopid: result.insertedId.toString(), _id: result.insertedId });

    return ImageResult;
}

module.exports = router