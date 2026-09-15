// TS strings are immutable, so the scan runs on a char array — the honest
// equivalent of the in-place algorithm. Two pointers walk inward and only
// vowel positions are ever written.
function reverseVowels(s: string): string {
    const vowels = new Set("aeiouAEIOU");
    const chars: string[] = s.split("");
    let lo = 0;
    let hi = chars.length - 1;
    while (lo < hi) {
        // Advance whichever side does not sit on a vowel.
        if (!vowels.has(chars[lo])) {
            lo++;
        } else if (!vowels.has(chars[hi])) {
            hi--;
        } else {
            // Both ends hold a vowel: swap them and step both inward.
            [chars[lo], chars[hi]] = [chars[hi], chars[lo]];
            lo++;
            hi--;
        }
    }
    return chars.join("");
}
