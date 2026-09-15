class Solution {
  public:
    int findLucky(vector<int> &arr) {
        // Values are bounded by 500, so a fixed tally array replaces a hash
        // map. Scanning it downward returns the largest value whose count
        // equals the value itself; -1 survives when none matches.
        array<int, 501> counts{};
        for (int value : arr) {
            ++counts[value];
        }
        for (int value = 500; value > 0; --value) {
            if (counts[value] == value) {
                return value;
            }
        }
        return -1;
    }
};
