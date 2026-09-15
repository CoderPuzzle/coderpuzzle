class Solution {
  public:
    int findLHS(vector<int> &nums) {
        // Deletion freedom reduces the subsequence to its value multiset:
        // only how often each value occurs matters, never the order. The
        // exactly-1 gap forces a harmonious pick onto the two values v and
        // v + 1, and a count-map key occurs at least once, so looking up
        // each key's successor is exactly the both-values-present test; the
        // largest count(v) + count(v + 1) wins, 0 when no adjacent pair
        // exists.
        unordered_map<int, int> counts;
        for (int value : nums) {
            ++counts[value];
        }
        int best = 0;
        for (const auto &entry : counts) {
            auto next = counts.find(entry.first + 1);
            if (next != counts.end()) {
                best = max(best, entry.second + next->second);
            }
        }
        return best;
    }
};
