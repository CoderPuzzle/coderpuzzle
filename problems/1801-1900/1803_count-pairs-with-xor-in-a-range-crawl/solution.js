/**
 * @param {number[]} nums
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countPairs = function (nums, low, high) {
    // The range condition splits into two "at most" counts: the answer is
    // f(high) - f(low - 1), where f(K) counts earlier values y with
    // x XOR y <= K. Every value fits in 15 bits (2 * 10^4 < 2^15), so the
    // trie walks 15 levels, top bit first. Children of node live at
    // 2 * node and 2 * node + 1 in next; each element is counted against the
    // trie before it is inserted, so every unordered pair is counted exactly
    // once. Counts stay under 2 * 10^8, far below 2^53, so plain numbers
    // are exact.
    const next = [-1, -1];
    const cnt = [0];
    // Number of trie values y with x XOR y <= k: a 1 bit of k counts the
    // whole subtree that keeps the xor prefix equal so far (the remaining
    // suffix is then strictly smaller) and descends the other child, while a
    // 0 bit only lets the matching child continue.
    const countAtMost = (x, k) => {
        let node = 0;
        let total = 0;
        for (let b = 14; b >= 0; b--) {
            const xb = (x >> b) & 1;
            if ((k >> b) & 1) {
                const equal = next[2 * node + xb];
                if (equal !== -1) total += cnt[equal];
                node = next[2 * node + 1 - xb];
            } else {
                node = next[2 * node + xb];
            }
            if (node === -1) return total;
        }
        return total + cnt[node];
    };
    let answer = 0;
    for (const x of nums) {
        answer += countAtMost(x, high);
        answer -= countAtMost(x, low - 1);
        let node = 0;
        for (let b = 14; b >= 0; b--) {
            const d = (x >> b) & 1;
            if (next[2 * node + d] === -1) {
                next[2 * node + d] = cnt.length;
                next.push(-1, -1);
                cnt.push(0);
            }
            node = next[2 * node + d];
            cnt[node]++;
        }
    }
    return answer;
};
