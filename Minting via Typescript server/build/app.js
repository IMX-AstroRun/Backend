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
const body_parser_1 = __importDefault(require("body-parser"));
const core_sdk_1 = require("@imtbl/core-sdk");
const walletConnection_1 = require("./libs/walletConnection");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
const port = 3000;
const config = core_sdk_1.Config.SANDBOX; // Or Config.PRODUCTION
const client = new core_sdk_1.ImmutableX(config);
const CONTRACT_ADDRESS = "0x12b53a44376f4f1ce6f8378384793bce4eb7171e";
const PRIVATE_KEY = "db9a059b2827d6691a2f3de17975dc9597cc9b38feb89811340b206cd23b9c8b";
const mintme = (wallet_address, tokenID) => __awaiter(void 0, void 0, void 0, function* () {
    const walletConnection = yield (0, walletConnection_1.generateWalletConnection)('goerli');
    const imxClient = new core_sdk_1.ImmutableX(core_sdk_1.Config.SANDBOX);
    const mintParams = {
        contract_address: CONTRACT_ADDRESS,
        users: [
            {
                tokens: [{ id: tokenID, blueprint: '{onchain-metadata}' }],
                user: '0xEdDfb2e6D08ef057A0586dB556F5b5c04a99507c',
            },
        ],
    };
    try {
        const mintResponse = yield imxClient.mint(walletConnection.ethSigner, mintParams);
        console.log('mintResponse', JSON.stringify(mintResponse));
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
});
app.get('/', (req, res) => {
    res.send("Hello");
});
app.post('', (req, res) => {
    res.send("Hello");
});
app.post("/mint", (req, res) => {
    //console.log(req.body.address);
    res.send(req.body);
    mintme(req.body.address, req.body.tokenID);
});
app.listen(port, () => {
    console.log("connected");
});
