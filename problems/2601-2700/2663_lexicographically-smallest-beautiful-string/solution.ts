function smallestBeautifulString(s: string, k: number): string {
    // A string avoids every palindromic substring iff it avoids the short
    // ones: any longer palindrome contains a length-2 or length-3 one at
    // its center (hint 1). So a character is safe exactly when it differs
    // from both of the two characters before it — only those could build a
    // forbidden palindrome ending here.
    const limit = 97 + k;
    const chars = s.split("");
    let pivot = -1;
    // Walk right to left and bump the first position that accepts a larger
    // safe letter; leaving earlier positions untouched keeps the result
    // minimal, since any smaller answer must agree with s even further.
    for (let i = chars.length - 1; i >= 0 && pivot === -1; i--) {
        const original = chars[i].charCodeAt(0);
        for (let code = original + 1; code < limit; code++) {
            const cand = String.fromCharCode(code);
            const ok = (i < 1 || chars[i - 1] !== cand) && (i < 2 || chars[i - 2] !== cand);
            if (ok) {
                chars[i] = cand;
                pivot = i;
                break;
            }
        }
    }
    if (pivot === -1) return "";
    // Rebuild everything after the pivot with the smallest safe letter,
    // which repeats as soon as blocking distance passes ("abcabc...").
    for (let j = pivot + 1; j < chars.length; j++) {
        for (let code = 97; code < limit; code++) {
            const cand = String.fromCharCode(code);
            const ok = (j < 1 || chars[j - 1] !== cand) && (j < 2 || chars[j - 2] !== cand);
            if (ok) {
                chars[j] = cand;
                break;
            }
        }
    }
    return chars.join("");
}
