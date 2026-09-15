/**
 * @param {string[]} arr
 * @return {string[]}
 */
var shortestSubstrings = function (arr) {
    // Join every other string into one scan text, NUL-separated so a
    // match can never straddle a boundary; since candidates contain
    // only lowercase letters, one containment test per candidate then
    // covers "occurs in any other string". Candidates are tried
    // shortest first and, within a length, in sorted order, so the
    // first survivor is both shortest and lexicographically smallest.
    const answers = [];
    for (let i = 0; i < arr.length; i++) {
        const s = arr[i];
        const others = arr.filter((_, j) => j !== i).join("\0");
        let best = "";
        for (let length = 1; length <= s.length; length++) {
            const seen = new Set();
            for (let a = 0; a + length <= s.length; a++) {
                seen.add(s.slice(a, a + length));
            }
            const candidates = [...seen].sort();
            for (const candidate of candidates) {
                if (!others.includes(candidate)) {
                    best = candidate;
                    break;
                }
            }
            if (best !== "") {
                break;
            }
        }
        answers.push(best);
    }
    return answers;
};
