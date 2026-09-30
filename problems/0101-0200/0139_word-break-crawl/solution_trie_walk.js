/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
    // Trie over the wordDict: nested objects keyed by letter, with "$"
    // marking a node where a word ends. From every reachable position a
    // walk follows s's own characters, so a branch dies at the first
    // character no remaining word shares, and each terminal crossed marks
    // the prefix after it reachable.
    const root = {};
    for (const word of wordDict) {
        let node = root;
        for (const ch of word) {
            if (!node[ch]) {
                node[ch] = {};
            }
            node = node[ch];
        }
        node["$"] = true;
    }
    const n = s.length;
    const reachable = new Array(n + 1).fill(false);
    reachable[0] = true;
    for (let i = 0; i < n; ++i) {
        if (!reachable[i]) continue;
        let node = root;
        for (let j = i; j < n; ++j) {
            const child = node[s[j]];
            if (!child) break;
            node = child;
            // Every terminal on the path ends a word at this depth.
            if (node["$"]) reachable[j + 1] = true;
        }
    }
    return reachable[n];
};
