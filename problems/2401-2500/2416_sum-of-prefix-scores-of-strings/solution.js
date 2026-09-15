/**
 * @param {string[]} words
 * @return {number[]}
 */
var sumPrefixScores = function (words) {
    // one shared trie: node.cnt equals the score of the prefix it ends
    const root = { next: new Map(), cnt: 0 };
    for (const word of words) {
        let node = root;
        for (const ch of word) {
            let nxt = node.next.get(ch);
            if (!nxt) {
                nxt = { next: new Map(), cnt: 0 };
                node.next.set(ch, nxt);
            }
            node = nxt;
            // count at every depth: the word itself scores its own prefixes
            node.cnt++;
        }
    }
    // second pass: a word's answer is the sum of cnt along its trie path
    const scores = [];
    for (const word of words) {
        let node = root;
        let total = 0;
        for (const ch of word) {
            node = node.next.get(ch);
            // cnt of the reached node is the score of the prefix so far
            total += node.cnt;
        }
        scores.push(total);
    }
    return scores;
};
