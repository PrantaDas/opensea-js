const { OpenSeaStreamClient, Network } = require('@opensea/stream-js');
const { WebSocket } = require('ws');


const client = new OpenSeaStreamClient({
    network: Network.TESTNET,
    connectOptions: {
        transport: WebSocket
    }
});


client.onItemListed("*", (event) => {
    console.log(event);
});
