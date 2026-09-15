/**
 * @param {string} s
 * @return {number}
 */
var longestBalanced = function (s) {
    const longestWithDelta = (target, cap) => {
        const prefix = new Array(s.length + 1).fill(0);
        const positions = new Map([[0, { values: [0], head: 0 }]]);
        let best = 0;
        for (let right = 1; right <= s.length; right += 1) {
            prefix[right] = prefix[right - 1] + (s[right - 1] === "1" ? 1 : -1);
            const expired = right - cap - 1;
            if (expired >= 0) {
                const oldQueue = positions.get(prefix[expired]);
                if (oldQueue !== undefined && oldQueue.values[oldQueue.head] === expired) oldQueue.head += 1;
            }
            const queue = positions.get(prefix[right] - target);
            if (queue !== undefined && queue.head < queue.values.length) {
                best = Math.max(best, right - queue.values[queue.head]);
            }
            let own = positions.get(prefix[right]);
            if (own === undefined) {
                own = { values: [], head: 0 };
                positions.set(prefix[right], own);
            }
            own.values.push(right);
        }
        return best;
    };

    let zeros = 0;
    for (const ch of s) if (ch === "0") zeros += 1;
    const ones = s.length - zeros;
    return Math.max(longestWithDelta(0, s.length), longestWithDelta(2, 2 * zeros), longestWithDelta(-2, 2 * ones));
};
