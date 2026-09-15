class Solution {
  public:
    int findMaximumXOR(vector<int> &nums) {
        int best = 0;
        int mask = 0;
        // Decide each answer bit from the MSB down: a set higher bit
        // dominates all lower bits, so keep it whenever some pair achieves it.
        for (int bit = 30; bit >= 0; bit--) {
            mask |= 1 << bit;
            // Prefixes = numbers truncated to the bits considered so far.
            unordered_set<int> prefixes;
            for (int value : nums) {
                prefixes.insert(value & mask);
            }
            int candidate = best | (1 << bit);
            // Achievable iff two prefixes XOR to candidate, i.e.
            // candidate ^ prefix is itself a prefix.
            bool found = false;
            for (int prefix : prefixes) {
                if (prefixes.count(candidate ^ prefix)) {
                    found = true;
                    break;
                }
            }
            if (found) {
                best = candidate;
            }
        }
        return best;
    }
};
