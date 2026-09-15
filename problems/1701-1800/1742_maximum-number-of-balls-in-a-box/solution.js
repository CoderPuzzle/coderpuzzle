/**
 * @param {number} lowLimit
 * @param {number} highLimit
 * @return {number}
 */
var countBalls = function (lowLimit, highLimit) {
    // Ball x is filed into box digit_sum(x), and with highLimit <= 10^5
    // no digit sum exceeds 45 (99999 -> 45), so a 46-slot counter
    // indexed by digit sum covers every box the range can reach. Sweep
    // once, strip digits with % 10 and Math.floor division by 10, bump
    // the named slot, and answer with the fullest slot.
    const counts = new Array(46).fill(0);
    for (let x = lowLimit; x <= highLimit; x++) {
        let v = x;
        let s = 0;
        while (v > 0) {
            s += v % 10;
            v = Math.floor(v / 10);
        }
        counts[s]++;
    }
    return Math.max(...counts);
};
