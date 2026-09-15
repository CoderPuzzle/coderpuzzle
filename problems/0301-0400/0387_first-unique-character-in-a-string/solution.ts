// A character is non-repeating exactly when it occurs once in the whole
// string — a global fact no prefix can settle — so the first pass tallies
// occurrences, one slot per letter of the alphabet.
function firstUniqChar(s: string): number {
    const counts: number[] = new Array(26).fill(0);
    for (let i = 0; i < s.length; ++i) {
        counts[s.charCodeAt(i) - 97]++;
    }
    // The second pass scans in index order for the first slot reading
    // exactly 1 — scanning left to right is what answers "first" — and
    // reaching the end without a hit means -1.
    for (let i = 0; i < s.length; ++i) {
        if (counts[s.charCodeAt(i) - 97] === 1) {
            return i;
        }
    }
    return -1;
}
