/**
 * @param {number[]} price
 * @param {number[][]} special
 * @param {number[]} needs
 * @return {number}
 */
var shoppingOffers = function (price, special, needs) {
    // Memoized DFS over the remaining-needs vector. Every state offers the
    // same two move kinds: buy one unit of any still-wanted item at its
    // list price, or apply any special offer that fits inside the state —
    // the fit check is what forbids buying more than wanted.
    const n = price.length;
    const memo = new Map();

    function dfs(cur) {
        // (c0, ..., c5) packed into one base-11 integer: every count <= 10.
        let key = 0;
        let empty = true;
        for (let i = 0; i < n; i += 1) {
            key = key * 11 + cur[i];
            if (cur[i] > 0) {
                empty = false;
            }
        }
        if (empty) {
            return 0;
        }
        if (memo.has(key)) {
            return memo.get(key);
        }
        let best = Infinity;
        // Move kind 1: one unit of item i, bought individually.
        for (let i = 0; i < n; i += 1) {
            if (cur[i] > 0) {
                cur[i] -= 1;
                best = Math.min(best, price[i] + dfs(cur));
                cur[i] += 1;
            }
        }
        // Move kind 2: a special offer, when it fits within cur.
        for (const offer of special) {
            let fits = true;
            for (let j = 0; j < n; j += 1) {
                if (offer[j] > cur[j]) {
                    fits = false;
                    break;
                }
            }
            if (fits) {
                for (let j = 0; j < n; j += 1) {
                    cur[j] -= offer[j];
                }
                best = Math.min(best, offer[n] + dfs(cur));
                for (let j = 0; j < n; j += 1) {
                    cur[j] += offer[j];
                }
            }
        }
        memo.set(key, best);
        return best;
    }

    return dfs([...needs]);
};
