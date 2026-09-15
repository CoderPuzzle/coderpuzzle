/**
 * @param {string} answerKey
 * @param {number} k
 * @return {number}
 */
var maxConsecutiveAnswers = function (answerKey, k) {
    // t/f count answers inside the window; a window can be made uniform by
    // flipping whichever character is currently the minority.
    let t = 0,
        f = 0;
    let left = 0;
    let best = 0;
    for (let right = 0; right < answerKey.length; right++) {
        if (answerKey[right] === "T") t++;
        else f++;
        // Valid iff the minority count fits within the k flips — the min
        // covers both choices of final majority at once. Validity is
        // monotone in window size, so shrinking from the left alone
        // restores it.
        while (Math.min(t, f) > k) {
            if (answerKey[left] === "T") t--;
            else f--;
            left++;
        }
        const w = right - left + 1;
        if (w > best) best = w;
    }
    return best;
};
