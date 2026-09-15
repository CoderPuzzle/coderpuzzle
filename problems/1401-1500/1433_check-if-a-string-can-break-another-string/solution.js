/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkIfCanBreak = function (s1, s2) {
    const a = s1.split("").sort();
    const b = s2.split("").sort();
    const dominates = (x, y) => {
        for (let i = 0; i < x.length; i++) {
            if (x[i] < y[i]) {
                return false;
            }
        }
        return true;
    };
    return dominates(a, b) || dominates(b, a);
};
