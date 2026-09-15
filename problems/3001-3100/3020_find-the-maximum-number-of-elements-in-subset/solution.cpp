class Solution {
  public:
    int maximumLength(vector<int> &nums) {
        unordered_map<int, int> counts;
        for (int value : nums)
            ++counts[value];
        int best = 0;
        auto ones = counts.find(1);
        if (ones != counts.end()) {
            // 1 squared is 1, so a run of 1s forms its own pattern: an odd
            // number is selectable; drop one when the count is even.
            best = ones->second % 2 == 1 ? ones->second : ones->second - 1;
        }
        for (auto &entry : counts) {
            int value = entry.first;
            if (value == 1)
                continue;
            // Climb x, x^2, x^4, ... taking a pair at every level but the
            // top, which stays single. Cap 31622 is the largest base whose
            // square does not exceed the 10^9 constraint bound, so the
            // 64-bit product below is always checked before it exists.
            int length = 1;
            int current = value;
            while (current <= 31622 && counts.find(current)->second >= 2) {
                long long square = static_cast<long long>(current) * current;
                auto next = counts.find(static_cast<int>(square));
                if (next == counts.end())
                    break;
                length += 2;
                current = next->first;
            }
            best = max(best, length);
        }
        return best;
    }
};
