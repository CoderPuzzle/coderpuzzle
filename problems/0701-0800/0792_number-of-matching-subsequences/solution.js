/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
var numMatchingSubseq = function (s, words) {
    // Bucket each word by the next character it waits for: stream s
    // once and advance every word waiting on the arriving character.
    const waiting = new Map(); // char -> array of [word, nextIndex]
    let count = 0;
    for (const w of words) {
        // Empty words match trivially (defensive; constraints say
        // non-empty).
        if (w.length === 0) {
            count++;
        } else {
            let b = waiting.get(w[0]);
            if (!b) {
                b = [];
                waiting.set(w[0], b);
            }
            b.push([w, 1]);
        }
    }
    for (const c of s) {
        // Take the bucket so re-filed entries are not reprocessed
        // within this step.
        const its = waiting.get(c);
        if (!its) continue;
        waiting.set(c, []);
        // The greedy subsequence check, distributed: a matched word
        // either completes or waits on its next character, and each
        // pointer only moves forward.
        for (const [w, i] of its) {
            if (i === w.length) {
                count++;
            } else {
                let b = waiting.get(w[i]);
                if (!b) {
                    b = [];
                    waiting.set(w[i], b);
                }
                b.push([w, i + 1]);
            }
        }
    }
    return count;
};
