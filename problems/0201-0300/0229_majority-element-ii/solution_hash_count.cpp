class Solution {
  public:
    vector<int> majorityElement(vector<int> &nums) {
        // A hash map counts every occurrence directly: one sweep tallies each
        // value into a table keyed by the value itself, and the map ends up
        // holding each distinct value's exact frequency.
        unordered_map<int, int> counts;
        for (int value : nums) {
            ++counts[value];
        }
        // At most two values can clear the n/3 bar, so one selection pass
        // over the entries finds the only two tallies that can matter: a
        // strictly greater tally takes the top slot, demoting the leader,
        // and ties keep the earlier entry — harmless, since equal tallies
        // qualify or fail together.
        int threshold = (int)nums.size() / 3;
        int bestValue = 0, bestCount = 0;
        int secondValue = 0, secondCount = 0;
        for (const auto &entry : counts) {
            int value = entry.first;
            int count = entry.second;
            if (count > bestCount) {
                secondValue = bestValue;
                secondCount = bestCount;
                bestValue = value;
                bestCount = count;
            } else if (count > secondCount) {
                secondValue = value;
                secondCount = count;
            }
        }
        // Selection only nominates; the threshold check is where an
        // exactly-n/3 value is excluded and an unfilled slot — a tally of
        // zero — fails. Map keys are distinct, so the slots cannot collide.
        vector<int> result;
        if (bestCount > threshold)
            result.push_back(bestValue);
        if (secondCount > threshold)
            result.push_back(secondValue);
        // At most two answers survive; sorting pins the ascending order the
        // examples show.
        sort(result.begin(), result.end());
        return result;
    }
};
