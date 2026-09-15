/**
 * @param {number} num
 * @return {number}
 */
var countDigits = function (num) {
    // Peel digits off the low end with % 10 / floor-division and test each
    // one against the untouched original. The input guarantees no zero
    // digit, so every divisor test is safe; 1e9 sits far inside Number's
    // exact range.
    let count = 0;
    for (let rest = num; rest > 0; rest = Math.floor(rest / 10)) if (num % (rest % 10) === 0) ++count;
    return count;
};
