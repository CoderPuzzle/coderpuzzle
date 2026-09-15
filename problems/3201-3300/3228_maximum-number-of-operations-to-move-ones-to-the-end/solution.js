/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
    // Each operation sends one '1' across one whole block of 0's, stopping
    // at the next '1' or the end. A pair — a '1' with a block of 0's
    // opening strictly to its right — is spent at most once, because 0's
    // never move and a landed '1' stays past them forever; always taking
    // the lowest legal index spends every such pair exactly once. The
    // answer is therefore just the number of these pairs: sweeping left
    // to right, whenever a fresh block of 0's opens, every '1' seen so
    // far sits to its left and contributes exactly one operation.
    let operations = 0;
    let ones = 0;
    for (let i = 0; i < s.length; ++i) {
        if (s[i] === "1") {
            ++ones;
        } else if (i === 0 || s[i - 1] === "1") {
            operations += ones;
        }
    }
    return operations;
};
