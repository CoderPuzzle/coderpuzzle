/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var rearrangeString = function (s, k) {
    // Distance k apart is vacuous when k <= 1: any two positions already
    // qualify, and the pinned canonical returns s unchanged.
    if (k <= 1) return s;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        counts[s.charCodeAt(i) - 97]++;
    }
    const out = [];
    let total = s.length;
    while (total > 0) {
        // Active letters in the pinned pass order: largest remaining count
        // first, ties to the smaller letter.
        const active = [];
        for (let letter = 0; letter < 26; ++letter) {
            if (counts[letter] > 0) active.push(letter);
        }
        active.sort((a, b) => counts[b] - counts[a] || a - b);
        const take = Math.min(k, active.length);
        // Fewer than k distinct letters while more remain: some window of k
        // consecutive positions would have to repeat a letter, so no
        // arrangement exists.
        if (take < k && total > take) return "";
        for (let i = 0; i < take; ++i) {
            out.push(String.fromCharCode(97 + active[i]));
            counts[active[i]]--;
            total--;
        }
    }
    return out.join("");
};
