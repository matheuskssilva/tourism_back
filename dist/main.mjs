import express from 'express';
import Amadeus from 'amadeus';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
}));
app.get('/', (req, res) => {
    res.send('API is running');
});
const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});
app.post('/api/flightSearch', async (req, res) => {
    var _a, _b;
    const { origin, destination, checkint, checkout, passengers, duration } = req.body;
    console.log('Incoming request data:', req.body);
    try {
        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: origin,
            destinationLocationCode: destination,
            departureDate: checkint,
            returnDate: checkout,
            adults: passengers.toString(),
            duration: duration
        });
        console.log('Amadeus response:', response.result);
        res.json(response.result);
    }
    catch (error) {
        console.error('Error fetching flight offers:', ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error);
        res.status(500).json({ error: 'Failed to fetch flight offers', details: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error });
    }
});
const PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
