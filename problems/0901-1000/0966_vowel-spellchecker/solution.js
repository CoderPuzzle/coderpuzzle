/**
 * @param {string[]} wordlist
 * @param {string[]} queries
 * @return {string[]}
 */
var spellchecker = function (wordlist, queries) {
    // Blank out the vowels of an already-lowercase word.
    const devowel = (low) => low.replace(/[aeiou]/g, "*");
    // One pass over the wordlist builds all three lookups; the has() guards
    // keep the FIRST word claiming each key — first-match-wins.
    const exact = new Set(wordlist);
    const byLower = new Map();
    const byDevowel = new Map();
    for (const w of wordlist) {
        const low = w.toLowerCase();
        if (!byLower.has(low)) {
            byLower.set(low, w);
        }
        const dv = devowel(low);
        if (!byDevowel.has(dv)) {
            byDevowel.set(dv, w);
        }
    }
    // Each query walks the tiers in precedence order: exact echo, then
    // case-insensitive, then vowel-blind, then "".
    const answer = [];
    for (const q of queries) {
        if (exact.has(q)) {
            answer.push(q);
            continue;
        }
        const low = q.toLowerCase();
        answer.push(byLower.get(low) ?? byDevowel.get(devowel(low)) ?? "");
    }
    return answer;
};
