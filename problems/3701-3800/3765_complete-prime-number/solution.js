/**
 * @param {number} num
 * @return {boolean}
 */
var completePrime = function (num) {
    // Test every prefix and every suffix for primality with trial
    // division on the 6k +- 1 wheel. At most ten digits means at most
    // eighteen slices, and each slice costs at most ~sqrt(num) / 3
    // division steps, so no sieve is ever needed.
    const digits = [];
    for (let m = num; m > 0; m = Math.floor(m / 10)) digits.push(m % 10);
    const count = digits.length;
    const prime = (value) => {
        if (value < 2) return false;
        if (value < 4) return true;
        if (value % 2 === 0 || value % 3 === 0) return false;
        for (let d = 5; d * d <= value; d += 6) {
            if (value % d === 0 || value % (d + 2) === 0) return false;
        }
        return true;
    };
    let scale = 1;
    for (let k = 1; k < count; k++) scale *= 10;
    // prefixes: the first k digits, most-significant first; suffixes: the
    // last k digits. Both scans include the whole number itself.
    for (let head = count - 1; head >= 0; head--) {
        if (!prime(Math.floor(num / scale))) return false;
        scale = Math.floor(scale / 10);
    }
    for (let k = 1; k < count; k++) {
        if (!prime(num % 10 ** k)) return false;
    }
    return true;
};
