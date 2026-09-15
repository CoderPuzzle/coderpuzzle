class Solution {
  public:
    vector<int> findXSum(vector<int> &nums, int k, int x) {
        // n <= 50, so each window is recounted directly: one count map per
        // window, then the distinct values sorted by count descending with
        // the value itself breaking ties. Taking the first x of that order
        // keeps every distinct value when fewer than x exist, which is
        // exactly the "x-sum is the array sum" rule.
        vector<int> answer;
        for (int start = 0; start + k <= (int)nums.size(); ++start) {
            map<int, int> counts;
            for (int i = start; i < start + k; ++i) {
                ++counts[nums[i]];
            }
            vector<pair<int, int>> top;
            // (count, value) pairs; the default pair order gives count
            // ascending, so iterate the reversed order for the top x.
            for (const auto &[value, count] : counts)
                top.push_back({count, value});
            sort(top.rbegin(), top.rend());
            // Sums stay within k * 50 = 2500, so int carries everything.
            int total = 0;
            for (int i = 0; i < x && i < (int)top.size(); ++i) {
                total += top[i].first * top[i].second;
            }
            answer.push_back(total);
        }
        return answer;
    }
};
