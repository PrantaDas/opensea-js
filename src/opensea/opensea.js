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
 * Get the balance of a wallet.
 *
 * @async
 * @function getBalance
 * @param {String} walletAddress - Wallet address of the user.
 * @returns {Promise<string>} The balance of the wallet.
 */
const getBalance = async (walletAddress) => {
    try {
        const balance = await web3.eth.getBalance(walletAddress);
        return balance;
    } catch (e) {
        console.error(e);
    }
};

/**
 * Get detailed information about an asset.
 *
 * @async
 * @function getAsset
 * @param {String} tokenAddress - The token address of the asset.
 * @param {String} tokenId - The tokenId of the asset.
 * @returns {Promise<Object>} The asset data.
 */
const getAsset = async (tokenAddress, tokenId) => {
    try {
        const asset = await openseaSDK.api.getAsset({
            tokenAddress,
            tokenId
        });
        return asset;
    } catch (e) {
        console.error(e);
    }
};

/**
 * Get the balance of an asset.
 *
 * @async
 * @function getAssetBalance
 * @param {String} tokenAddress - Asset's token address.
 * @param {String} tokenId - Asset's tokenId.
 * @param {String} accountAddress - The asset's account address.
 * @returns {Promise<string>} The asset balance.
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
    } catch (e) {
        console.error(e);
    }
};

/**
 * Get the balance of a token.
 *
 * @async
 * @function getTokenBalance
 * @param {String} accountAddress - Token's account address.
 * @param {String} tokenAddress - Token address.
 * @returns {Promise<string>} The token balance.
 */
const getTokenBalance = async (accountAddress, tokenAddress) => {
    try {
        let tokenObj = {
            accountAddress,
            tokenAddress
        };
        const tokenBalance = await openseaSDK.getTokenBalance(tokenObj);
        return tokenBalance;
    } catch (e) {
        console.error(e);
    }
};

/**
 * List an asset for sale on OpenSea.
 *
 * @async
 * @function listAsset
 * @param {String} tokenId - Asset's tokenId.
 * @param {String} tokenAddress - Asset's token address.
 * @param {String} accountAddress - Asset's account address.
 * @param {Number} startAmount - Start amount.
 * @param {Number} endAmount - End amount.
 * @returns {Promise<Object>} Response of the listed asset.
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
        } else {
            assetObject.endAmount = startAmount;
        }

        const res = await openseaSDK.createSellOrder(assetObject);
        return res;

    } catch (e) {
        console.error(e);
    }
};

/**
 * Create an offer for an asset on OpenSea.
 *
 * @async
 * @function createOffer
 * @param {String} tokenId - Asset's tokenId.
 * @param {String} tokenAddress - Asset's token address.
 * @param {String} schemaName - The schema name.
 * @param {Number} startAmount - The start amount.
 * @returns {Promise<Object>} Transaction hash.
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
    } catch (e) {
        console.error(`[+]   ${e}`);
    }
};

/**
 * Get statistics for an OpenSea collection.
 *
 * @async
 * @function getCollectionStat
 * @param {String} slug - The collection slug.
 * @returns {Promise<Object>} Collection statistics.
 */
const getCollectionStat = async (slug) => {
    try {
        const { data } = await axios.get(`https://testnets-api.opensea.io/api/v1/collection/${slug}/stats`);
        return data;
    } catch (e) {
        console.error(`[+]  ${e}`);
    }
};

/**
 * Place an order for an asset on OpenSea.
 *
 * @async
 * @function placeOrder
 * @param {String} tokenAddress - Asset's token address.
 * @param {String} tokenId - Asset's tokenId.
 * @param {String} accountAddress - Asset's account address.
 * @returns {Promise<string>} Transaction hash.
 */
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
    } catch (e) {
        console.error(e);
    }
};

/**
 * Transfer an asset on OpenSea.
 *
 * @async
 * @function transferAsset
 * @param {String} tokenId - Asset's tokenId.
 * @param {String} tokenAddress - Asset's token address.
 * @param {String} fromAddress - The sender's address.
 * @param {String} toAddress - The recipient's address.
 * @returns {Promise<string>} Transaction hash.
 */
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

    } catch (e) {
        console.error(e);
    }
};

/**
 * Get all ask orders for a specific asset on OpenSea.
 *
 * @async
 * @function getAllOrder
 * @param {String} tokenId - Asset's tokenId.
 * @param {String} tokenAddress - Asset's token address.
 * @returns {Promise<Array>} An array of ask orders.
 */
const getAllOrder = async (tokenId, tokenAddress) => {
    try {
        const { orders } = await openseaSDK.getOrders({
            assetContractAddress: tokenAddress,
            tokenId,
            side: "ask"
        });
        return orders;
    } catch (e) {
        console.error(e);
    }
};

module.exports = {
    getBalance,
    getAsset,
    getAseetBalance,
    getTokenBalance,
    createOffer,
    listAsset,
    getCollectionStat,
    placeOrder,
    transferAsset,
    getAllOrder
};
