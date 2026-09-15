class Solution {
  public:
    int findMaxK(vector<int> &nums) {
        // A positive k is valid exactly when -k sits in the same array, so
        // membership is the whole question -- drop every value into a hash
        // set once, then scan for the largest positive whose negation is
        // present. Values are nonzero by the constraints, so no value can
        // be its own partner. Values fit in [-1000, 1000], so a plain
        // boolean lookup table stands in for the hash set.
        array<bool, 2001> present{};
        present.fill(false);
        for (int value : nums) {
            present[value + 1000] = true;
        }
        int best = -1;
        for (int value : nums) {
            if (value > 0 && present[-value + 1000] && value > best) {
                best = value;
            }
        }
        return best;
    }
};
