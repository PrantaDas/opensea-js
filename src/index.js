const { placeOrder, createOffer, transferAsset } = require('./opensea/opensea');

require('dotenv').config();


async function run() {

    try {
        // const hash = await placeOrder('0x317a8Fe0f1C7102e7674aB231441E485c64c178A', '145372', process.env.WALLET_ADDRESS);
        // console.log(hash);

        // const trxHash = await transferAsset('16743178896712607286770337842831649995034688274962931578238429760547576610817', '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C', '0x3033b1bABdf8029E5B37434b24c4E984843B2108', process.env.WALLET_ADDRESS,);
        // console.log(trxHash);


        const offer = await createOffer('95631409356815567861028268063158584947317398217371012175566858160805525848065', '0xf4910C763eD4e47A585E2D34baA9A4b611aE448C', 'ERC1155', process.env.WALLET_ADDRESS, 1);
        console.log(offer)
    }
    catch (err) { console.log(err.message) }

};

run();