/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function (num1, num2) {
    // Waviness of one number: an interior digit is a peak when it is
    // strictly greater than both neighbors and a valley when it is
    // strictly less than both; equal neighbors never count.
    const waviness = (n) => {
        if (n < 100) {
            return 0;
        }
        let prev = n % 10; // least significant digit so far
        n = Math.floor(n / 10);
        let cur = n % 10;
        n = Math.floor(n / 10);
        let w = 0;
        while (true) {
            const nxt = n % 10;
            if ((cur > prev && cur > nxt) || (cur < prev && cur < nxt)) {
                w++;
            }
            prev = cur;
            cur = nxt;
            n = Math.floor(n / 10);
            if (n === 0) {
                break;
            }
        }
        return w;
    };
    // The range holds at most 10^5 numbers of at most 6 digits each, so the
    // plain enumeration the hint suggests is plenty; every value involved
    // stays far below Number's exact-integer limit.
    let total = 0;
    for (let x = num1; x <= num2; x++) {
        total += waviness(x);
    }
    return total;
};
