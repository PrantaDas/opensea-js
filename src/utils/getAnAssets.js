const axios = require('axios');


const getSingle = async (tokenAddress, tokenId) => {
    const { data } = await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${tokenAddress}/${tokenId}/`);
    return data;
};

module.exports = { getSingle };