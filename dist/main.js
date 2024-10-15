"use strict";

var _express = _interopRequireDefault(require("express"));
var _amadeus = _interopRequireDefault(require("amadeus"));
var dotenv = _interopRequireWildcard(require("dotenv"));
var _cors = _interopRequireDefault(require("cors"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
dotenv.config();
const app = (0, _express.default)();
app.use(_express.default.json());
app.use((0, _cors.default)({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.get('/', (req, res) => {
  res.send('API is running');
});
const amadeus = new _amadeus.default({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});
app.post('/api/flightSearch', async (req, res) => {
  const {
    origin,
    destination,
    checkint,
    checkout,
    passengers,
    duration
  } = req.body;
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
    console.log('Amadeus response:', response.result); // Log para verificar os dados
    res.json(response.result); // Certifique-se de que está retornando os dados corretos
  } catch (error) {
    console.error('Error fetching flight offers:', error.response?.data || error);
    res.status(500).json({
      error: 'Failed to fetch flight offers',
      details: error.response?.data || error
    });
  }
});
const PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});