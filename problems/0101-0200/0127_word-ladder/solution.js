/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
    const wordSet = new Set(wordList);
    // No sequence can end outside the dictionary.
    if (!wordSet.has(endWord)) return 0;
    const length = beginWord.length;
    const patternOf = (word, i) => word.slice(0, i) + "*" + word.slice(i + 1);

    // Bucket every word under each wildcard pattern ("hot" -> "*ot", "h*t",
    // "ho*"): all one-letter neighbors share one of its patterns.
    const buckets = new Map();
    for (const word of wordList) {
        for (let i = 0; i < length; ++i) {
            const pattern = patternOf(word, i);
            if (!buckets.has(pattern)) buckets.set(pattern, []);
            buckets.get(pattern).push(word);
        }
    }

    // Level-order BFS; steps starts at 1 because beginWord itself counts.
    const visited = new Set([beginWord]);
    let queue = [beginWord];
    let steps = 1;
    while (queue.length > 0) {
        const next = [];
        for (const word of queue) {
            if (word === endWord) return steps;
            for (let i = 0; i < length; ++i) {
                const bucket = buckets.get(patternOf(word, i));
                if (bucket === undefined) continue;
                // Delete the bucket so it is read once overall and never
                // re-read via a same-level word sharing the pattern.
                buckets.delete(patternOf(word, i));
                // Each word is enqueued at most once.
                for (const neighbor of bucket) {
                    if (!visited.has(neighbor)) {
                        visited.add(neighbor);
                        next.push(neighbor);
                    }
                }
            }
        }
        queue = next;
        ++steps;
    }
    return 0;
};
