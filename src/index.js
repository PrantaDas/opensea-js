const axios = require('axios');
const { OpenSeaSDK, Network } = require('opensea-js');
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { getAllAssets } = require('./utils/gietAllAssets');
const { getSingle } = require('./utils/getAnAssets');
require('dotenv').config();

const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24)

const providerInstance = new HDWalletProvider({
    mnemonic: process.env.MNEMONIC_PHRASE,
    providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    addressIndex: 0
});

const web3 = new Web3(providerInstance);

const openseaSDK = new OpenSeaSDK(providerInstance, {
    networkName: Network.Goerli
})

async function run() {

    try {
        const data = await getSingle('0xf4910C763eD4e47A585E2D34baA9A4b611aE448C', '12087922578345158879831720231698215641969932036082872121571835687573779382273');
        console.log(data);
        // const balance = await web3.eth.getBalance(process.env.WALLET_ADDRESS);
        // console.log(balance)

        // return console.log(data.current_price)
        // const listing = await openseaSDK.createSellOrder({
        //     asset: {
        //         tokenId: '99594647061978534468532609838878724278064030191675643512898771044265919250433',
        //         tokenAddress: '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C'
        //     },
        //     accountAddress: process.env.WALLET_ADDRESS,
        //     startAmount: 0.0001,
        //     endAmount: 0.000001,
        //     expirationTime
        // });
        // console.log(listing);

        const order = await openseaSDK.createBuyOrder({
            asset: {
                tokenId: data.token_id,
                tokenAddress: data.asset_contract.address,
                name: data.name,
                schemaName: data.asset_contract.schema_name
            },
            accountAddress: process.env.WALLET_ADDRESS,
            startAmount: 1
        });
        console.log(order);
    }
    catch (err) { console.log(err.message) }

};

run();