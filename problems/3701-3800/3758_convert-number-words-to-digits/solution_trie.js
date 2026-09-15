/**
 * @param {string} s
 * @return {string}
 */
var convertNumber = function (s) {
    // Trie over the ten digit words: nested objects keyed by letter, with
    // "$" marking a node where a word ends. No word is a prefix of another,
    // so a walk from any position crosses at most one terminal, and the
    // first terminal reached is exactly where the word ends.
    const root = {};
    for (const [word, digit] of [
        ["zero", "0"],
        ["one", "1"],
        ["two", "2"],
        ["three", "3"],
        ["four", "4"],
        ["five", "5"],
        ["six", "6"],
        ["seven", "7"],
        ["eight", "8"],
        ["nine", "9"],
    ]) {
        let node = root;
        for (const ch of word) {
            node[ch] = node[ch] || {};
            node = node[ch];
        }
        node["$"] = digit;
    }
    const digits = [];
    const n = s.length;
    let i = 0;
    while (i < n) {
        let node = root;
        let j = i;
        let hit = null;
        while (j < n && node[s[j]]) {
            node = node[s[j]];
            ++j;
            if (node["$"]) {
                hit = [node["$"], j];
                break;
            }
        }
        if (hit === null) {
            ++i;
        } else {
            digits.push(hit[0]);
            i = hit[1];
        }
    }
    return digits.join("");
};
