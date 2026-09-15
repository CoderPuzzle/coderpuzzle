/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
    const groups = new Map();
    for (const word of strs) {
        // Sorting canonicalizes the character multiset: anagrams produce
        // byte-identical keys and non-anagrams can never collide on one.
        const key = word.split("").sort().join("");
        // Every word lands in exactly one bucket, alongside precisely its
        // rearrangements; a first-seen key opens the bucket.
        if (!groups.has(key)) {
            groups.set(key, []);
        }
        groups.get(key).push(word);
    }
    // The buckets are the required groups.
    return Array.from(groups.values());
};
