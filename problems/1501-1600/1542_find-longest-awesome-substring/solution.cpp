class Solution {
  public:
    int longestAwesome(string s) {
        // mask is a 10-bit number: bit d is 1 when digit d has appeared an
        // odd number of times in the prefix s[0:i+1]. firstSeen maps a
        // prefix mask to the smallest index that produced it (mask 0 maps
        // to -1, the empty prefix before the string starts). Two prefixes
        // sharing a mask cancel out to all-even digit counts between them
        // (already rearrangeable into a palindrome); two prefixes whose
        // masks differ in exactly one bit cancel to a single odd count
        // (the lone middle character of an odd-length palindrome).
        unordered_map<int, int> firstSeen;
        firstSeen[0] = -1;
        int mask = 0;
        int best = 0;
        for (int i = 0; i < (int)s.size(); ++i) {
            mask ^= 1 << (s[i] - '0');
            auto it = firstSeen.find(mask);
            if (it != firstSeen.end()) {
                best = max(best, i - it->second);
            } else {
                firstSeen[mask] = i;
            }
            for (int digit = 0; digit < 10; ++digit) {
                int candidate = mask ^ (1 << digit);
                auto found = firstSeen.find(candidate);
                if (found != firstSeen.end())
                    best = max(best, i - found->second);
            }
        }
        return best;
    }
};
