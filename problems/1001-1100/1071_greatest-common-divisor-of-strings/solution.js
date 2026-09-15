/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
    // A common divisor string can only exist if the two strings agree on
    // their concatenation order; that is exactly the algebraic signature
    // of both being built from repetitions of one string.
    if (str1 + str2 !== str2 + str1) {
        return "";
    }
    // The largest such divisor is the prefix whose length is the GCD of
    // the two string lengths, found via the Euclidean algorithm.
    let a = str1.length;
    let b = str2.length;
    while (b !== 0) {
        const t = b;
        b = a % b;
        a = t;
    }
    return str1.slice(0, a);
};
