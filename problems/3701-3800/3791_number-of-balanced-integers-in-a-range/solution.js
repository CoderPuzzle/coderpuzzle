/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countBalanced = function (low, high) {
    function countUpTo(x) {
        if (x < 10) {
            return 0;
        }
        const s = String(x);
        const n = s.length;
        const span = 9 * n;
        const size = 2 * span + 1;
        // ways[i][t + span]: assignments of slots i..n-1 with free digits
        // 0..9 whose signed sum is t (slot j contributes +digit when j is
        // even and -digit when j is odd, 0-based from the left). Every
        // count stays at most 10^15 + 1, far inside the 2^53 exact range,
        // so plain numbers carry them exactly.
        const ways = Array.from({ length: n + 1 }, () => new Array(size).fill(0));
        ways[n][span] = 1;
        for (let i = n - 1; i >= 0; i--) {
            const sign = i % 2 === 0 ? 1 : -1;
            for (let t = -span; t <= span; t++) {
                let total = 0;
                for (let d = 0; d <= 9; d++) {
                    const u = t - sign * d;
                    if (u >= -span && u <= span) {
                        total += ways[i + 1][u + span];
                    }
                }
                ways[i][t + span] = total;
            }
        }
        let count = 0;
        let diff = 0;
        for (let i = 0; i < n; i++) {
            const v = s.charCodeAt(i) - 48;
            const sign = i % 2 === 0 ? 1 : -1;
            // A digit below x's own fixes a smaller prefix forever, so
            // the freed tail counts whenever it can cancel the running
            // difference; x's digit itself keeps the walk tight.
            for (let c = 0; c < v; c++) {
                const u = -diff - sign * c;
                if (u >= -span && u <= span) {
                    count += ways[i + 1][u + span];
                }
            }
            diff += sign * v;
        }
        if (diff === 0) {
            count += 1;
        }
        // Padding with leading zeros preserves "alternating sum is
        // zero" exactly for balanced numbers, but lets m = 0 slip in;
        // it is the only non-balanced value ever counted, so drop it.
        return count - 1;
    }
    return countUpTo(high) - countUpTo(low - 1);
};
