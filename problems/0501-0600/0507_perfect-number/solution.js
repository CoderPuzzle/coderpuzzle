/**
 * @param {number} num
 * @return {boolean}
 */
var checkPerfectNumber = function (num) {
    // Proper divisors pair around the square root: whenever i divides num,
    // so does num / i, and one of the pair never exceeds sqrt(num). Seed
    // the total with 1 — the partner of the excluded num itself — then add
    // both members on each clean division below the root. Every integer in
    // play stays far below 2⁵³, where these doubles still count exactly.
    if (num <= 1) {
        return false;
    }
    let total = 1;
    for (let i = 2; i * i <= num; ++i) {
        if (num % i === 0) {
            total += i;
            // A candidate sitting exactly on the root is its own partner.
            if (i !== num / i) {
                total += num / i;
            }
        }
    }
    return total === num;
};
