const { placeOrder, createOffer } = require('./opensea/opensea');

require('dotenv').config();


async function run() {

    try {
        // const hash = await placeOrder('0xf4910C763eD4e47A585E2D34baA9A4b611aE448C', '95631409356815567861028268063158584947317398217371012175566858158606502592513', '0xDC309296940dE50611F055EE28507A29AC220A04');
        // console.log(hash);
        const offter = createOffer('95631409356815567861028268063158584947317398217371012175566858159706014220289', '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C', 'ERC1155', '0xDC309296940dE50611F055EE28507A29AC220A04', 0.1)
    }
    catch (err) { console.log(err.message) }

};

run();