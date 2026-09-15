// Bulls are positional matches, tallied directly. Every other digit drops
// into one of two 10-slot counters — one per side — and the cows are the
// multiset overlap of the two leftovers, min per digit.
function getHint(secret: string, guess: string): string {
    let bulls = 0;
    const secretLeft: number[] = new Array(10).fill(0);
    const guessLeft: number[] = new Array(10).fill(0);
    for (let index = 0; index < secret.length; ++index) {
        if (secret[index] === guess[index]) {
            bulls++;
        } else {
            // Only unmatched positions feed the cow pools: an exact match
            // consumes one copy of the digit on both sides up front.
            secretLeft[secret.charCodeAt(index) - 48]++;
            guessLeft[guess.charCodeAt(index) - 48]++;
        }
    }
    let cows = 0;
    for (let digit = 0; digit < 10; ++digit) {
        // A leftover guess digit needs a leftover secret partner, so any
        // surplus copy beyond the other counter simply dies.
        cows += Math.min(secretLeft[digit], guessLeft[digit]);
    }
    return `${bulls}A${cows}B`;
}
