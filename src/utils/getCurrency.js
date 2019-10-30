// import cc from "currency-codes";
import n from "country-js";

export default function getCurrency(countryCode) {
    if(n.search(countryCode).length > 0) {
        var currency = n.search(countryCode)[0].currency
        return {
            ...currency
        }
    } else {
        return null
    }
}