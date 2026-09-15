class Solution {
  public:
    int findPairs(vector<int> &nums, int k) {
        // One count map carries both halves: its keys are the distinct
        // values, so v + k membership is O(1), and its frequencies are
        // exactly what k == 0 asks for. A pair is identified by its two
        // values, so repeats enter the same pair at most once.
        unordered_map<int, int> counts;
        for (int value : nums) {
            ++counts[value];
        }
        int pairs = 0;
        if (k == 0) {
            // A 0-diff pair needs two equal values at different indexes, so a
            // value contributes once when it occurs at least twice — further
            // copies add nothing.
            for (const auto &entry : counts) {
                if (entry.second > 1)
                    ++pairs;
            }
        } else {
            // k > 0: count each distinct value whose partner v + k is also
            // present; scanning only upward pairs every couple exactly once
            // and never matches a value with itself.
            for (const auto &entry : counts) {
                if (counts.count(entry.first + k) > 0)
                    ++pairs;
            }
        }
        return pairs;
    }
};
