/**
 * @param {string} num
 * @return {boolean}
 */
var sumGame = function (num) {
    // Track f = 2*diff + 9*k where diff is (left sum - right sum) over
    // fixed digits and k = (#'?' left) - (#'?' right). Every fill changes
    // f by an odd offset in [-9, 9] regardless of side. Alice wins iff
    // f != 0: she pushes +9 each turn, Bob can cancel at most -9 per
    // reply, and Bob holds f at 0 by mirroring whenever it starts there.
    let diff = 0;
    let k = 0;
    const n = num.length;
    for (let i = 0; i < n; i++) {
        const ch = num[i];
        if (ch === "?") {
            if (i < n / 2) {
                k++;
            } else {
                k--;
            }
        } else {
            const d = ch.charCodeAt(0) - 48;
            if (i < n / 2) {
                diff += d;
            } else {
                diff -= d;
            }
        }
    }
    return 2 * diff + 9 * k !== 0;
};
