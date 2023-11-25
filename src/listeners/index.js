/**
 * OpenSeaStreamClient is a client for interacting with the OpenSea WebSocket API.
 *
 * @typedef {Object} OpenSeaStreamClient
 * @property {Function} onItemListed - Register a callback for the "itemListed" event.
 * @property {Function} connect - Connect to the OpenSea WebSocket API.
 * @property {Function} disconnect - Disconnect from the OpenSea WebSocket API.
 * @property {Function} isConnected - Check if the client is currently connected.
 */

/**
 * Network is an enum representing the supported networks.
 *
 * @typedef {Object} Network
 * @property {string} MAINNET - The Mainnet network.
 * @property {string} RINKEBY - The Rinkeby test network.
 * @property {string} TESTNET - The default test network.
 */

/**
 * WebSocket is a class representing a WebSocket connection.
 *
 * @class WebSocket
 * @see https://www.npmjs.com/package/ws
 */

/**
 * An instance of OpenSeaStreamClient connected to the OpenSea WebSocket API on the TESTNET network.
 *
 * @constant {OpenSeaStreamClient} client
 * @see https://github.com/ProjectOpenSea/stream-js
 */

/**
 * Listen for the "itemListed" event and log the event details to the console.
 *
 * @param {Object} event - The event object received when an item is listed.
 */

const { OpenSeaStreamClient, Network } = require('@opensea/stream-js');
const { WebSocket } = require('ws');

/**
 * Creates an instance of OpenSeaStreamClient and connects to the OpenSea WebSocket API.
 *
 * @const {OpenSeaStreamClient} client - An instance of OpenSeaStreamClient connected to the OpenSea WebSocket API.
 * @see https://github.com/ProjectOpenSea/stream-js
 */
const client = new OpenSeaStreamClient({
    network: Network.TESTNET,
    connectOptions: {
        transport: WebSocket
    }
});

/**
 * Event listener for the "itemListed" event.
 *
 * @param {Object} event - The event object received when an item is listed.
 */
client.onItemListed("*", (event) => {
    console.log(event);
});
