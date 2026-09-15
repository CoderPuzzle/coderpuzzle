/**
 * @param {number} n
 * @return {number}
 */
var nextBeautifulNumber = function (n) {
    function isBalanced(value) {
        const counts = new Array(10).fill(0);
        while (value > 0) {
            const digit = value % 10;
            if (digit === 0) return false;
            ++counts[digit];
            value = Math.floor(value / 10);
        }
        for (let digit = 1; digit < 10; ++digit) {
            if (counts[digit] !== 0 && counts[digit] !== digit) return false;
        }
        return true;
    }

    for (let candidate = n + 1; ; ++candidate) {
        if (isBalanced(candidate)) return candidate;
    }
};
