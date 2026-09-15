/**
 * @param {number[]} arr
 * @return {number}
 */
var maxChunksToSorted = function (arr) {
    // Prefix maximum sweep: the first i + 1 elements are exactly the
    // set {0..i} iff their maximum is i, so each such index is a cut.
    let chunks = 0;
    let runMax = -1;
    for (let i = 0; i < arr.length; ++i) {
        if (arr[i] > runMax) {
            runMax = arr[i];
        }
        // A boundary lands wherever the running max equals the index: every
        // legal cut is counted, and taking all of them is optimal.
        if (runMax === i) {
            ++chunks;
        }
    }
    return chunks;
};
