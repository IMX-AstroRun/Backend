import express, {Application, Request, Response} from "express";
import bodyParser from 'body-parser';

import { ImmutableX, Config, UnsignedMintRequest} from '@imtbl/core-sdk';
import { generateWalletConnection } from './libs/walletConnection';

const app: Application = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
const port: Number = 3000;

const config = Config.SANDBOX; // Or Config.PRODUCTION
const client = new ImmutableX(config);

const CONTRACT_ADDRESS = "0x12b53a44376f4f1ce6f8378384793bce4eb7171e";
const PRIVATE_KEY = "db9a059b2827d6691a2f3de17975dc9597cc9b38feb89811340b206cd23b9c8b";

const mintme = async (wallet_address: string, tokenID:string) => {
    const walletConnection = await generateWalletConnection('goerli');
  
    const imxClient = new ImmutableX(Config.SANDBOX);
  
    const mintParams: UnsignedMintRequest = {
      contract_address: CONTRACT_ADDRESS,
      users: [
        {
          tokens: [{ id: tokenID, blueprint: '{onchain-metadata}' }],
          user: '0xEdDfb2e6D08ef057A0586dB556F5b5c04a99507c',
        },
      ],
    };
  
    try {
      const mintResponse = await imxClient.mint(
        walletConnection.ethSigner,
        mintParams,
      );
  
      console.log('mintResponse', JSON.stringify(mintResponse));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };


app.get('/', (req: Request, res: Response) => {

    res.send("This Server is LIVE");

})

app.post('', (req: Request, res: Response) => {

    res.send("POST REQUEST WORKING");

})

app.post("/mint", (req: Request, res:Response) => {
    //console.log(req.body.address);
    res.send(req.body);
    mintme(req.body.address, req.body.tokenID)

  });

app.listen(port, () => {
    console.log("connected")
})


