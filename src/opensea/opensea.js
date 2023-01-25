const { OpenSeaSDK, Network } = require('opensea-js');
const Web3 = require('web3');
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config();
const axios = require('axios');

const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);

const providerInstance = new HDWalletProvider({
    mnemonic: process.env.MNEMONIC_PHRASE,
    providerOrUrl: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    addressIndex: 0
});

const web3 = new Web3(providerInstance);

const openseaSDK = new OpenSeaSDK(providerInstance, {
    networkName: Network.Goerli
});


/**
 * 
 * @param {String} walletAddress wallet address of the user 
 * @returns the balance of the wallet
 */
const getBalance = async (walletAddress) => {
    try {
        const balance = await web3.eth.getBalance(wallet);
        return balance;
    }
    catch (e) { console.log(e) }
};


/**
 * 
 * @param {String} tokenAddress the token address of an asset
 * @param {String} tokenId the tokenId of an asset
 * @returns the assets daa
 */
const getAsset = async (tokenAddress, tokenId) => {
    try {
        const asset = await openseaSDK.api.getAsset({
            tokenAddress,
            tokenId
        })
        return asset;
    }
    catch (e) { console.log(e) }
};


/**
 * 
 * @param {String} tokenAddress asset's token address
 * @param {String} tokenId asset's token Id
 * @param {String} accountAddress the asset's account address
 * @returns asset balance
 */
const getAseetBalance = async (tokenAddress, tokenId, accountAddress) => {
    try {
        let assetObject = {
            asset: {
                tokenAddress,
                tokenId
            },
            accountAddress
        };

        const assetBalance = await openseaSDK.getAssetBalance(assetObject);
        return assetBalance;
    }
    catch (e) { console.log(e) }
};


/**
 * 
 * @param {String} accountAddress token's account address
 * @param {String} tokenAddress token address
 * @returns token balance
 */
const getTokenBalance = async (accountAddress, tokenAddress) => {
    try {
        let tokenObj = {
            accountAddress,
            tokenAddress
        }
        const tokenBalance = await openseaSDK.getTokenBalance(tokenObj);
        return tokenBalance;
    }
    catch (e) { console.log(e) }
};



/**
 * 
 * @param {String} tokenId asset's token id
 * @param {String} tokenAddress asset's token address
 * @param {String} accountAddress asset's account address
 * @param {Number} startAmount start amount
 * @param {number} endAmount end amount
 * @returns response of the listed asset
 */
const listAsset = async (tokenId, tokenAddress, accountAddress, startAmount, endAmount) => {
    try {
        let assetObject = {
            asset: {
                tokenId,
                tokenAddress
            },
            accountAddress,
            startAmount,
            endAmount,
            expirationTime
        };
        if (endAmount) {
            assetObject.endAmount = endAmount;
        }
        else {
            assetObject.endAmount = startAmount;
        }

        const res = await openseaSDK.createSellOrder(assetObject);
        return res;

    }
    catch (e) { console.log(e) }
};

/**
 * 
 * @param {String} tokenId asset's token Id
 * @param {String} tokenAddress asset' token address
 * @param {String} schemaName the schema name
 * @param {String} accountAddress the user wallet address
 * @param {Number} startAmount the start amount
 * @returns transaction hash
 */
const createOffer = async (tokenId, tokenAddress, schemaName, startAmount) => {
    try {
        let orderObj = {
            asset: {
                tokenId,
                tokenAddress,
                schemaName: schemaName || 'ERC1155'
            },
            accountAddress: process.env.WALLET_ADDRESS,
            startAmount: startAmount
        };

        const offer = await openseaSDK.createBuyOrder(orderObj);
        return offer;
    }
    catch (e) { console.log(`[+]   ${e}`) }
};

const getCollectionStat = async (slug) => {
    try {
        const { data } = await axios.get(`https://testnets-api.opensea.io/api/v1/collection/${slug}/stats`);
        return data;
    }
    catch (e) { console.log(`[+]  ${e}`) }
};

const placeOrder = async (tokenAddress, tokenId, accountAddress) => {
    try {
        let filterObj = {
            assetContractAddress: tokenAddress,
            tokenId,
            side: 'ask'
        };
        const order = await openseaSDK.api.getOrder(filterObj);
        const trxhash = await openseaSDK.fulfillOrder({ order, accountAddress });
        return trxhash;
    }
    catch (e) { console.log(e) }
};


const transferAsset = async (tokenId, tokenAddress, fromAddress, toAddress) => {
    try {
        const data = await getAsset(tokenAddress, tokenId);
        let assetObj = {
            asset: {
                tokenId,
                tokenAddress,
                schemaName: data.assetContract.schemaName
            },
            fromAddress,
            toAddress
        };

        const trxHash = await openseaSDK.transfer(assetObj);
        return trxHash;

    }
    catch (e) { console.log(e) }
};


const getAllOrder = async (tokenId, tokenAddress) => {
    try {
        const { orders } = await openseaSDK.getOrders({
            assetContractAddress: tokenAddress,
            tokenId,
            side: "ask"
        });
        return orders;
    }
    catch (e) { console.log(e) }
};


module.exports = { getBalance, getAsset, getAseetBalance, getTokenBalance, createOffer, listAsset, getCollectionStat, placeOrder, transferAsset, getAllOrder };