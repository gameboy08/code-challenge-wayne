import isEmpty from "./isEmpty";

it('empty object', () => {
    expect(isEmpty({})).toBeTruthy()
})

it('non empty object', () => {
    expect(isEmpty({a:'b'})).toBeFalsy()
})