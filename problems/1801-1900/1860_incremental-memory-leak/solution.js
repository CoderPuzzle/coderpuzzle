/**
 * @param {number} memory1
 * @param {number} memory2
 * @return {number[]}
 */
var memLeak = function (memory1, memory2) {
    // Straight simulation: at most ~93k seconds for 2^31 inputs because the
    // consumed total grows quadratically. All touched values stay far below
    // Number.MAX_SAFE_INTEGER.
    let a = memory1;
    let b = memory2;
    let t = 1;
    for (;;) {
        if (a >= b) {
            if (a < t) {
                break;
            }
            a -= t;
        } else {
            if (b < t) {
                break;
            }
            b -= t;
        }
        t++;
    }
    return [t, a, b];
};
