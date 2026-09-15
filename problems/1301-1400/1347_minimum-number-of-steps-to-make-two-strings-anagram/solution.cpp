class Solution {
  public:
    int minSteps(string s, string t) {
        // The answer is the per-letter deficit of t relative to s; each
        // replacement clears one unit, and deficits equal surpluses.
        array<int, 26> counts{};
        for (char ch : s) {
            ++counts[ch - 'a'];
        }
        for (char ch : t) {
            --counts[ch - 'a'];
        }
        int steps = 0;
        for (int delta : counts) {
            if (delta < 0) {
                steps -= delta;
            }
        }
        return steps;
    }
};
