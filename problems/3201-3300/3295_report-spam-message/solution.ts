// A word is banned or it is not: collapse bannedWords into a hash set
// (internal duplicates collapse harmlessly). Scan the message counting every
// occurrence that lands in the set — the same banned word twice in the message
// counts twice — and stop as soon as two matches have been seen; on a 10^5-word
// message the early exit can skip the rest.
function reportSpam(message: string[], bannedWords: string[]): boolean {
    const banned = new Set(bannedWords);
    let count = 0;
    for (const word of message) {
        if (banned.has(word)) {
            if (++count === 2) {
                return true;
            }
        }
    }
    return false;
}
