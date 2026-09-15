class Solution {
  public:
    int findShortestSubArray(vector<int> &nums) {
        // The degree is a maximum frequency, and a window reaches it only by
        // holding every copy of some value at that frequency: drop one copy
        // and that value falls short. One pass records each value's count,
        // first index, and last index; the answer is then the tightest
        // first-to-last span among the values whose count equals the degree.
        unordered_map<int, int> count, first, last;
        for (int index = 0; index < (int)nums.size(); ++index) {
            int value = nums[index];
            ++count[value];
            first.emplace(value, index);
            last[value] = index;
        }
        int degree = 0;
        for (const auto &entry : count) {
            degree = max(degree, entry.second);
        }
        int best = (int)nums.size();
        for (const auto &entry : count) {
            if (entry.second == degree) {
                int value = entry.first;
                best = min(best, last[value] - first[value] + 1);
            }
        }
        return best;
    }
};
