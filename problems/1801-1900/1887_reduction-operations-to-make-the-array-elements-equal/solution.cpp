class Solution {
  public:
    // Sorted ascending: crossing into a new (larger) distinct value
    // raises the level; element i costs its level = number of distinct
    // smaller values below it.
    long long reductionOperations(vector<int> &nums) {
        sort(nums.begin(), nums.end());
        long long ans = 0;
        int level = 0;
        for (size_t i = 1; i < nums.size(); i++) {
            if (nums[i] != nums[i - 1])
                level++;
            ans += level;
        }
        return ans;
    }
};
