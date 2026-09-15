class Solution {
  public:
    int maxFrequencyElements(vector<int> &nums) {
        // One pass builds the value -> frequency map; every value whose
        // frequency equals the maximum contributes that many elements.
        unordered_map<int, int> frequencies;
        for (int num : nums) {
            ++frequencies[num];
        }
        int maximum = 0;
        for (const auto &entry : frequencies) {
            maximum = max(maximum, entry.second);
        }
        int total = 0;
        for (const auto &entry : frequencies) {
            if (entry.second == maximum) {
                total += entry.second;
            }
        }
        return total;
    }
};
