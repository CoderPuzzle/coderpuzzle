class Solution {
  public:
    long long wonderfulSubstrings(string word) {
        // count[m] = prefixes seen so far with parity mask m (10 bits, letters a..j).
        // count[0] = 1 seeds the empty prefix so substrings starting at index 0 count.
        long long count[1024] = {0};
        count[0] = 1;
        int mask = 0;
        long long total = 0;
        for (char ch : word) {
            mask ^= 1 << (ch - 'a');
            // Substring between two prefixes with masks P, Q has parity P^Q:
            // wonderful iff P == Q (all even) ...
            total += count[mask];
            // ... or P^Q is a single bit (exactly one odd letter).
            for (int b = 0; b < 10; ++b) {
                total += count[mask ^ (1 << b)];
            }
            // Increment AFTER counting so each pair uses an earlier prefix —
            // every substring is counted exactly once.
            count[mask] += 1;
        }
        return total;
    }
};
