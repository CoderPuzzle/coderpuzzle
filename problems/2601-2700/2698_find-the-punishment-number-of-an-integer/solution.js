/**
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function (n) {
    // Part sums are abandoned past i <= 1000 and i * i <= 10^6, so every
    // Number below stays far inside double precision — no BigInt needed.
    let total = 0;
    for (let i = 1; i <= n; i++) {
        const digits = String(i * i);
        const length = digits.length;
        let found = false;
        for (let mask = 0; mask < 1 << (length - 1); mask++) {
            let sum = 0;
            let cur = 0;
            let pruned = false;
            for (let k = 0; k < length; k++) {
                cur = cur * 10 + (digits.charCodeAt(k) - 48);
                if (((mask >> k) & 1) !== 0) {
                    sum += cur;
                    cur = 0;
                    if (sum > i) {
                        pruned = true;
                        break;
                    }
                }
            }
            if (!pruned && sum + cur === i) {
                found = true;
                break;
            }
        }
        if (found) {
            total += i * i;
        }
    }
    return total;
};
