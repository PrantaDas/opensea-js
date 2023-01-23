const axios = require('axios');


const getAllAssets = async () => {
    const { data } = await axios.get('https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20&include_orders=false');
    return data;
};

module.exports = { getAllAssets };