class Solution {
  public:
    int sumCounts(vector<int> &nums) {
        int n = nums.size();
        long long ans = 0;
        // For each left end, grow the right end one element at a time; the
        // running distinct set only ever grows, so its size is the
        // distinct count of every prefix subarray nums[i..j].
        for (int i = 0; i < n; ++i) {
            vector<bool> seen(101, false);
            int distinct = 0;
            for (int j = i; j < n; ++j) {
                if (!seen[nums[j]]) {
                    seen[nums[j]] = true;
                    ++distinct;
                }
                ans += (long long)distinct * distinct;
            }
        }
        return (int)ans;
    }
};
