/**
 * @param {number} primeOne
 * @param {number} primeTwo
 * @return {number}
 */
var mostExpensiveItem = function (primeOne, primeTwo) {
    // Reachability sieve over the prices 0..primeOne*primeTwo: hint 1
    // promises everything above that bound is buyable, so the answer
    // hides somewhere inside. A price is buyable iff dropping one
    // primeOne- or primeTwo-coin leaves a buyable price — walk the
    // sieve upward and remember the largest price that never lights
    // up. The product stays under 10^5, far below Number's exact
    // integer range, so plain arithmetic never loses precision.
    const limit = primeOne * primeTwo;
    const reachable = new Array(limit + 1).fill(false);
    reachable[0] = true;
    let best = 0;
    for (let price = 1; price <= limit; ++price) {
        if ((price >= primeOne && reachable[price - primeOne]) || (price >= primeTwo && reachable[price - primeTwo])) {
            reachable[price] = true;
        } else {
            best = price;
        }
    }
    return best;
};
