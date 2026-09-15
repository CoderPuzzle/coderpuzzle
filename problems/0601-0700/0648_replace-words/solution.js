/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
    // One set holds every root, so a prefix test is a single hash
    // lookup. No root is longer than 100 letters, so a word longer
    // than that can stop its scan early — prefixes past the cap could
    // not equal any root anyway.
    const roots = new Set(dictionary);
    // Each derivative is replaced by its shortest matching root, and
    // the scan tries prefixes shortest first, so the first hit is the
    // answer; a word no root prefixes keeps itself.
    const replaced = [];
    for (const word of sentence.split(" ")) {
        let replacement = word;
        const limit = Math.min(word.length, 100);
        for (let length = 1; length <= limit; ++length) {
            const prefix = word.slice(0, length);
            if (roots.has(prefix)) {
                replacement = prefix;
                break;
            }
        }
        replaced.push(replacement);
    }
    return replaced.join(" ");
};
