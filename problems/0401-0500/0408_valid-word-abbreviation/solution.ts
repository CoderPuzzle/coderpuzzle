// Two indexes walk word and abbr together: a letter must match exactly, a
// digit run is one skip, and both walks must end together.
function validWordAbbreviation(word: string, abbr: string): boolean {
    let i = 0;
    let j = 0;
    while (i < word.length && j < abbr.length) {
        const c = abbr[j];
        if (c >= "0" && c <= "9") {
            // A digit run may not open with '0': that is a leading zero (and
            // a zero skip would replace an empty substring).
            if (c === "0") {
                return false;
            }
            let skip = 0;
            // Consume the whole run: "12" and "55" are single skips, so
            // adjacent replacements can never masquerade as two.
            while (j < abbr.length && abbr[j] >= "0" && abbr[j] <= "9") {
                skip = skip * 10 + (abbr.charCodeAt(j) - 48);
                j++;
            }
            i += skip;
        } else {
            if (word[i] !== c) {
                return false;
            }
            i++;
            j++;
        }
    }
    // A skip past the end, leftover word, or leftover abbr all fail here.
    return i === word.length && j === abbr.length;
}
