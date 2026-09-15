/**
 * @param {number[]} data
 * @return {number}
 */
var minSwaps = function (data) {
    // the grouped block must hold every 1, so its length is fixed at ones
    let ones = 0;
    for (const v of data) ones += v;
    if (ones <= 1) return 0;
    // zeros in the first window: each zero inside costs exactly one swap
    let zeros = 0;
    for (let i = 0; i < ones; i++) {
        if (data[i] === 0) zeros++;
    }
    let best = zeros;
    for (let i = ones; i < data.length; i++) {
        // slide by one: entering element adds its zero-ness, leaving
        // element drops its, so the tally stays exact without rescanning
        zeros += 1 - data[i] - (1 - data[i - ones]);
        if (zeros < best) best = zeros;
    }
    return best;
};
