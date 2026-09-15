// TS strings are immutable, so the flips run on a char array — the honest
// equivalent of the in-place algorithm. Flip the whole line once, then
// re-flip each word.
function reverseWords(s: string): string {
    const chars: string[] = s.split("");
    reverseRange(chars, 0, chars.length - 1);
    const n = chars.length;
    let start = 0;
    for (let stop = 0; stop <= n; ++stop) {
        // A word ends at each separating space (and at the end of the line).
        if (stop === n || chars[stop] === " ") {
            reverseRange(chars, start, stop - 1);
            start = stop + 1;
        }
    }
    return chars.join("");
}

// Flip a range of the array in place, endpoints included.
function reverseRange(chars: string[], lo: number, hi: number): void {
    while (lo < hi) {
        [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
        lo++;
        hi--;
    }
}
