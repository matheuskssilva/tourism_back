"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var amadeus_1 = require("amadeus");
var dotenv = require("dotenv");
var cors_1 = require("cors");
dotenv.config();
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, cors_1["default"])({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.get('/', function (req, res) {
    res.send('API is running');
});
var amadeus = new amadeus_1["default"]({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
});
app.post('/api/flightSearch', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, origin, destination, checkint, checkout, passengers, duration, response, error_1;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, origin = _a.origin, destination = _a.destination, checkint = _a.checkint, checkout = _a.checkout, passengers = _a.passengers, duration = _a.duration;
                console.log('Incoming request data:', req.body);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, amadeus.shopping.flightOffersSearch.get({
                        originLocationCode: origin,
                        destinationLocationCode: destination,
                        departureDate: checkint,
                        returnDate: checkout,
                        adults: passengers.toString(),
                        duration: duration
                    })];
            case 2:
                response = _d.sent();
                console.log('Amadeus response:', response.result); // Log para verificar os dados
                res.json(response.result); // Certifique-se de que está retornando os dados corretos
                return [3 /*break*/, 4];
            case 3:
                error_1 = _d.sent();
                console.error('Error fetching flight offers:', ((_b = error_1.response) === null || _b === void 0 ? void 0 : _b.data) || error_1);
                res.status(500).json({ error: 'Failed to fetch flight offers', details: ((_c = error_1.response) === null || _c === void 0 ? void 0 : _c.data) || error_1 });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
