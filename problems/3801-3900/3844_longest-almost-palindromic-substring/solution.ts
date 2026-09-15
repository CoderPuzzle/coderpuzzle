function almostPalindromic(s: string): number {
    const n = s.length;

    // These arrays describe intervals of the two preceding lengths.
    // Empty and one-character intervals are palindromes. A one-character
    // interval is also almost-palindromic because deleting it leaves the
    // empty palindrome.
    let palTwo = new Uint8Array(n + 1).fill(1);
    let almostTwo = new Uint8Array(n + 1);
    let palOne = new Uint8Array(n).fill(1);
    let almostOne = new Uint8Array(n).fill(1);
    let best = 1;

    for (let length = 2; length <= n; length++) {
        const count = n - length + 1;
        const palNow = new Uint8Array(count);
        const almostNow = new Uint8Array(count);
        for (let left = 0; left < count; left++) {
            const right = left + length - 1;
            const sameEnds = s[left] === s[right];
            palNow[left] = Number(sameEnds && palTwo[left + 1] !== 0);

            // Delete the right end, delete the left end, or keep both
            // matching ends and use the deletion inside.
            almostNow[left] = Number(
                palOne[left] !== 0 || palOne[left + 1] !== 0 || (sameEnds && almostTwo[left + 1] !== 0),
            );
            if (almostNow[left]) {
                best = length;
            }
        }

        palTwo = palOne;
        palOne = palNow;
        almostTwo = almostOne;
        almostOne = almostNow;
    }

    return best;
}
