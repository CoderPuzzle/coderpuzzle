/**
 * @param {number[]} nums1
 * @param {number[]} nums0
 * @return {number}
 */
var maxValue = function (nums1, nums0) {
    const segments = nums1.map((ones, index) => [ones, nums0[index]]);
    const category = ([ones, zeros]) => (zeros === 0 ? 0 : ones === 0 ? 2 : 1);
    segments.sort((left, right) => {
        const categoryDifference = category(left) - category(right);
        if (categoryDifference !== 0) return categoryDifference;
        if (category(left) !== 1) return 0;
        if (left[0] !== right[0]) return right[0] - left[0];
        return left[1] - right[1];
    });

    const modulus = 1_000_000_007;
    let answer = 0;
    for (const [ones, zeros] of segments) {
        for (let count = 0; count < ones; ++count) answer = (answer * 2 + 1) % modulus;
        for (let count = 0; count < zeros; ++count) answer = (answer * 2) % modulus;
    }
    return answer;
};
