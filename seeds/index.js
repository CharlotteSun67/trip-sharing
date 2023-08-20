const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64e116f3c350ae38edf6c3c8',
            location: `${cities[random1000].city, cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/ddp6txkx4/image/upload/v1692483880/YelpCamp/qczkbt8awwxq7s0plump.png',
                    filename: 'YelpCamp/qczkbt8awwxq7s0plump',
                },
                {
                    url: 'https://res.cloudinary.com/ddp6txkx4/image/upload/v1692483880/YelpCamp/qczkbt8awwxq7s0plump.png',
                    filename: 'YelpCamp/qczkbt8awwxq7s0plump',
                }
            ],
            description: 'abcdeft',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});