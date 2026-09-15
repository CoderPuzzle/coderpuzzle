/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
    // One counting pass over the array.
    const counts = new Map();
    for (const w of words) {
        counts.set(w, (counts.get(w) || 0) + 1);
    }
    // Buckets indexed by frequency: a word with count c lands in
    // buckets[c], and no count can exceed n.
    const n = words.length;
    const buckets = Array.from({ length: n + 1 }, () => []);
    for (const [word, count] of counts) {
        buckets[count].push(word);
    }
    const result = [];
    // Walk frequencies from the highest possible down; within one bucket
    // sort words ascending, so ties break alphabetically — and stop as
    // soon as k words are in hand.
    for (let c = n; c >= 1 && result.length < k; c--) {
        const bucket = buckets[c];
        if (bucket.length === 0) continue;
        bucket.sort();
        for (const word of bucket) {
            if (result.length === k) break;
            result.push(word);
        }
    }
    return result;
};
