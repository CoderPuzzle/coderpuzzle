/**
 * @param {number} num
 * @return {number}
 */
var maximumSwap = function (num) {
    // One swap can raise exactly one position, and a position is worth
    // more the further left it sits, so the best swap moves the largest
    // available digit as far left as it can go. Record the last index of
    // each digit value, then scan left to right: at the first position
    // where a larger digit occurs later, swap in the largest such digit,
    // taken from its LAST occurrence — the tiebreak pushes the displaced
    // smaller digit as far right as it can go. No qualifying position
    // means num is already maximal and is returned unchanged.
    const digits = String(num).split("");
    const last = new Array(10).fill(-1);
    for (let i = 0; i < digits.length; i++) {
        last[Number(digits[i])] = i;
    }
    for (let i = 0; i < digits.length; i++) {
        for (let value = 9; value > Number(digits[i]); value--) {
            if (last[value] > i) {
                [digits[i], digits[last[value]]] = [digits[last[value]], digits[i]];
                return Number(digits.join(""));
            }
        }
    }
    return num;
};
