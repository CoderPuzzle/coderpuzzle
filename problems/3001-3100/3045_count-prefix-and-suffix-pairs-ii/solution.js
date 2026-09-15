/**
 * Trie over paired characters (first+last, second+second-last, ...). The
 * answer can reach C(10^5, 2) ~ 5 * 10^9, far below 2^53, so Number stays
 * exact.
 * @param {string[]} words
 * @return {number}
 */
var countPrefixSuffixPairs = function (words) {
    const edges = new Map();
    const counts = [0];
    let total = 0;
    for (const word of words) {
        const size = word.length;
        let node = 0;
        for (let j = 0; j < size; j++) {
            const key = node * 676 + (word.charCodeAt(j) - 97) * 26 + (word.charCodeAt(size - 1 - j) - 97);
            let next = edges.get(key);
            if (next === undefined) {
                next = counts.length;
                edges.set(key, next);
                counts.push(0);
            }
            node = next;
            total += counts[node];
        }
        counts[node]++;
    }
    return total;
};
