const LETTER_BITS = { A: 0, C: 1, G: 2, T: 3 };
const LETTERS = "ACGT";

/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
    const seen = new Set();
    // A second set collects each repeated window exactly once, even when it
    // occurs three or more times.
    const repeated = new Set();
    // 20-bit register: ten letters times two bits each. The oldest letter
    // slides out as the new one slides in.
    let code = 0;
    for (let i = 0; i < s.length; i++) {
        code = ((code << 2) | LETTER_BITS[s[i]]) & 0xfffff;
        // Fewer than ten letters seen: no full window yet.
        if (i >= 9) {
            if (seen.has(code)) {
                // Already seen: this window occurs at least twice.
                repeated.add(code);
            } else {
                seen.add(code);
            }
        }
    }
    // Decode the surviving codes back into letters; sorted output for a
    // deterministic order.
    const result = [];
    for (const value of repeated) {
        const letters = [];
        let bits = value;
        for (let k = 0; k < 10; k++) {
            letters.push(LETTERS[bits & 3]);
            bits >>= 2;
        }
        result.push(letters.reverse().join(""));
    }
    return result.sort();
};
