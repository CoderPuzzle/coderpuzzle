/**
 * @param {number} num
 * @return {number[]}
 */
var closestDivisors = function (num) {
    // The closest pair for a product m has its smaller factor as large as
    // possible: the first divisor found walking down from floor(sqrt(m)).
    const closest = (m) => {
        let d = Math.floor(Math.sqrt(m));
        while (m % d !== 0) {
            --d;
        }
        return [d, m / d];
    };
    const a = closest(num + 1);
    const b = closest(num + 2);
    return a[1] - a[0] <= b[1] - b[0] ? a : b;
};
