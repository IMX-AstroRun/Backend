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
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWalletConnection = void 0;
const providers_1 = require("@ethersproject/providers");
const wallet_1 = require("@ethersproject/wallet");
const core_sdk_1 = require("@imtbl/core-sdk");
/**
 * Generate a ethSigner/starkSigner object from a private key.
 */
const generateWalletConnection = (ethNetwork) => __awaiter(void 0, void 0, void 0, function* () {
    const userPrivateKey = "db9a059b2827d6691a2f3de17975dc9597cc9b38feb89811340b206cd23b9c8b";
    const userStarkKey = "0x7917eDb51ecD6CdB3F9854c3cc593F33de10c623";
    const alchemyKey = "WmzAboIrYGOEDnuUJnxQ8ucuu3jfoR_q";
    // connect provider
    const provider = new providers_1.AlchemyProvider(ethNetwork, alchemyKey);
    // L1 credentials
    const ethSigner = new wallet_1.Wallet(userPrivateKey).connect(provider);
    // L2 credentials
    const starkSigner = (0, core_sdk_1.createStarkSigner)(userStarkKey);
    return {
        ethSigner,
        starkSigner,
    };
});
exports.generateWalletConnection = generateWalletConnection;
