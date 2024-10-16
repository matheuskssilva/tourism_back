import express, { Request, Response, NextFunction } from 'express';
import Amadeus from 'amadeus';
import * as dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());

// Adicionar headers de CORS manualmente
app.use((req: Request, res: Response, next: NextFunction): void => {
    res.header('Access-Control-Allow-Origin', 'https://tourism-front-sage.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('API is running');
});

const amadeus = new Amadeus({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

app.post('/api/flightSearch', async (req: Request, res: Response) => {
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
    } catch (error) {
        console.error('Error fetching flight offers:', error.response?.data || error);
        res.status(500).json({ error: 'Failed to fetch flight offers', details: error.response?.data || error });
    }
});

const PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
