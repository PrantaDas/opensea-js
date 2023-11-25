# OpenSea-JS Integration

Integrate with OpenSea using the OpenSea-JS library for seamless interaction with the OpenSea API and smart contracts. This project provides JavaScript functions for various actions, including getting wallet balances, fetching asset details, creating offers, listing assets for sale, and more.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PrantaDas/opensea-js.git
    ```

2. Change to the project directory:

    ```bash
    cd opensea-js-integration
    ```

3. Install dependencies:

    ```bash
    npm install or yarn
    ```

4. Create a `.env` file and add the necessary environment variables:

    ```env
    MNEMONIC_PHRASE=your_mnemonic_phrase
    INFURA_API_KEY=your_infura_api_key
    WALLET_ADDRESS=your_wallet_address
    ```

## Usage

Import the functions you need from the `opensea.js` module and use them in your project. Make sure to handle errors appropriately.

```javascript
const {
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
} = require('./opensea/opensea');

// Use the functions as needed in your application
// Example: Get wallet balance
const balance = await getBalance('0x12d9c5fd9e271d2ccc3d8697ff9d2d139d534108');
console.log('Wallet Balance:', balance);
