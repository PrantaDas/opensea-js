const axios = require('axios');
const { OpenSeaSDK, Network } = require('opensea-js');
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { transferAsset } = require('./src/opensea/opensea');
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
});

let orderObj = {
    asset: {
        tokenId: '12087922578345158879831720231698215641969932036082872121571835688673291010049',
        tokenAddress: '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C',
        schemaName: "ERC1155"
    },
    accountAddress: '0xDC309296940dE50611F055EE28507A29AC220A04',
    startAmount: 1
};



async function test() {
    try {

        // const price = await web3.utils.toWei('0.00000001', 'ether');
        // const balanceOfWETH = await openseaSDK.getTokenBalance({
        //     accountAddress: '0xd36D75a5da2135cc4E834764a60C2Adcf97b1440', // string
        //     tokenAddress: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"
        // });

        // const token = (await openseaSDK.api.getPaymentTokens({ symbol: 'WETH' })).tokens[0];
        // console.log(token);

        // const hash = await transferAsset('99594647061978534468532609838878724278064030191675643512898771042066895994881', '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C', process.env.WALLET_ADDRESS, '0x3033b1bABdf8029E5B37434b24c4E984843B2108');
        // console.log('[+] =>' + hash);

        // return console.log(balanceOfWETH)
        // return console.log(price)

        const offer = await openseaSDK.createBuyOrder({
            asset: {
                tokenId: '16743178896712607286770337842831649995034688274962931578238429734159297544193',
                tokenAddress: '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C',
                schemaName: 'RSC1155' // WyvernSchemaName. If omitted, defaults to 'ERC721'. Other options include 'ERC20' and 'ERC1155'
            },
            accountAddress: process.env.WALLET_ADDRESS,
            // Value of the offer, in units of the payment token (or wrapped ETH if none is specified):
            startAmount: 0.1
        })
        console.log(offer)

    }
    catch (e) { console.log(e) }
};

test();