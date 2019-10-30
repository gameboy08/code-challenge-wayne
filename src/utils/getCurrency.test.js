import getCurrency from "./getCurrency";
import { airport } from "./mockData";

it('get right currency', () => {
    expect(getCurrency(airport.country.countryCode).currencyName).toContain("CFP FRANC")
})