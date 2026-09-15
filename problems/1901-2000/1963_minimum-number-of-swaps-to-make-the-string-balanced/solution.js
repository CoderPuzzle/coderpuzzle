/**
 * @param {string} s
 * @return {number}
 */
var minSwaps = function (s) {
    // One pass: track the running balance of '[' minus ']'. Whenever the
    // balance goes negative, the current prefix is impossible to balance
    // without a swap, so swap the offending ']' with the last '[' — which
    // is exactly what a single counter models by bumping balance up by 2.
    let balance = 0;
    let swaps = 0;
    for (const c of s) {
        if (c === "[") balance++;
        else balance--;
        if (balance < 0) {
            swaps++;
            balance += 2;
        }
    }
    return swaps;
};
