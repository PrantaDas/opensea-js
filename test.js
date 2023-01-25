const axios = require('axios');
const { OpenSeaSDK, Network } = require('opensea-js');
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
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
        let payLoad = {
            token_id: '99594647061978534468532609838878724278064030191675643512898771045365430878209',
            price: 0.1
        }

        const signature = await web3.eth.sign(payLoad, process.env.WALLET_ADDRESS);
        console.log(signature)
        const { data } = await axios.post(`https://testnets-api.opensea.io/v2/orders/goerli/seaport/offers`, {
            ...payLoad,
            signature
        });
        console.log(data);
    }
    catch (e) { console.log(e) }
};

test();