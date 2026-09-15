/**
 * @param {number[]} nums
 * @return {number}
 */
var sortableIntegers = function (nums) {
    const n = nums.length;
    const ordered = [...nums].sort((a, b) => a - b);
    let total = 0;
    for (let k = 1; k <= n; ++k) {
        if (n % k !== 0) continue;
        let ok = true;
        for (let start = 0; start < n; start += k) {
            if (!isRotation(nums.slice(start, start + k), ordered.slice(start, start + k))) {
                ok = false;
                break;
            }
        }
        if (ok) total += k;
    }
    return total;

    // A sequence is a cyclic rotation of the block exactly when it appears
    // inside `block + block`; a KMP scan answers that in O(k).
    function isRotation(block, target) {
        const k = block.length;
        const text = block.concat(block);
        const pi = new Array(k).fill(0);
        for (let i = 1; i < k; ++i) {
            let j = pi[i - 1];
            while (j > 0 && target[i] !== target[j]) j = pi[j - 1];
            if (target[i] === target[j]) ++j;
            pi[i] = j;
        }
        let j = 0;
        for (let i = 0; i < text.length; ++i) {
            while (j > 0 && text[i] !== target[j]) j = pi[j - 1];
            if (text[i] === target[j]) ++j;
            if (j === k) return true;
        }
        return false;
    }
};
