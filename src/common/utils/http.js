const axios = require("axios");
const getAddressDetail = async (lat, lng) => {
    const result =
        await axios.get(`${process.env.MAP_URL}?lat=${lat}&lon=${lng}`, {
            headers: {
                "x-api-key": process.env.MAP_TOKEN
            }
        }).then(res => res.data)
    return {
        province: result.province,
        city: result.city,
        district: result.district,
        address: result.address,
    }
}
module.exports = {
    getAddressDetail
}