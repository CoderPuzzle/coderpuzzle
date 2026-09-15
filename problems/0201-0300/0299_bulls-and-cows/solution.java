class Solution {

    public String getHint(String secret, String guess) {
        // Bulls are positional matches, tallied directly. Every other digit
        // drops into one of two 10-slot counters — one per side — and the
        // cows are the multiset overlap of the two leftovers, min per digit.
        int bulls = 0;
        int[] secretLeft = new int[10];
        int[] guessLeft = new int[10];
        for (int index = 0; index < secret.length(); ++index) {
            char s = secret.charAt(index);
            char g = guess.charAt(index);
            if (s == g) {
                bulls++;
            } else {
                // Only unmatched positions feed the cow pools: an exact match
                // consumes one copy of the digit on both sides up front.
                secretLeft[s - '0']++;
                guessLeft[g - '0']++;
            }
        }
        int cows = 0;
        for (int digit = 0; digit < 10; ++digit) {
            // A leftover guess digit needs a leftover secret partner, so any
            // surplus copy beyond the other counter simply dies.
            cows += Math.min(secretLeft[digit], guessLeft[digit]);
        }
        return bulls + "A" + cows + "B";
    }
}
