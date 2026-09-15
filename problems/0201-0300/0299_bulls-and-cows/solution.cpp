class Solution {
  public:
    string getHint(string secret, string guess) {
        // Bulls are positional matches, tallied directly. Every other digit
        // drops into one of two 10-slot counters — one per side — and the
        // cows are the multiset overlap of the two leftovers, min per digit.
        int bulls = 0;
        int secretLeft[10] = {0};
        int guessLeft[10] = {0};
        for (int index = 0; index < (int)secret.size(); ++index) {
            if (secret[index] == guess[index]) {
                bulls++;
            } else {
                // Only unmatched positions feed the cow pools: an exact match
                // consumes one copy of the digit on both sides up front.
                secretLeft[secret[index] - '0']++;
                guessLeft[guess[index] - '0']++;
            }
        }
        int cows = 0;
        for (int digit = 0; digit < 10; ++digit) {
            // A leftover guess digit needs a leftover secret partner, so any
            // surplus copy beyond the other counter simply dies.
            cows += min(secretLeft[digit], guessLeft[digit]);
        }
        return to_string(bulls) + "A" + to_string(cows) + "B";
    }
};
