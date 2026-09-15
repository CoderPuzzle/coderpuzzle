/**
 * @param {string} s
 * @return {string}
 */
var minimizeStringValue = function (s) {
    // A letter appearing x times costs x*(x-1)/2 no matter where it sits, so
    // only the final counts matter: each '?' should take the currently least
    // frequent letter (smallest letter on ties — that also makes the fill
    // lexicographically smallest). The chosen letters are then sorted into
    // the '?' slots left to right. Scanning all 26 counts per '?' is O(26n),
    // well within n = 1e5.
    const A = 97;
    const counts = new Array(26).fill(0);
    for (const ch of s) {
        if (ch !== "?") {
            counts[ch.charCodeAt(0) - A]++;
        }
    }
    const picks = [];
    for (const ch of s) {
        if (ch === "?") {
            let best = 0;
            for (let letter = 1; letter < 26; letter++) {
                if (counts[letter] < counts[best]) {
                    best = letter;
                }
            }
            counts[best]++;
            picks.push(best);
        }
    }
    picks.sort((a, b) => a - b);
    const characters = s.split("");
    let at = 0;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i] === "?") {
            characters[i] = String.fromCharCode(A + picks[at]);
            at++;
        }
    }
    return characters.join("");
};
