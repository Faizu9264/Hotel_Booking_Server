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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.post('/create-checkout-session', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Booking',
                        },
                        unit_amount: 1000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: process.env.USER_DOMAIN/success,
            cancel_url: process.env.USER_DOMAIN/cancel,
        });
        res.json({ id: session.id });
    }
    catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
module.exports = router;
