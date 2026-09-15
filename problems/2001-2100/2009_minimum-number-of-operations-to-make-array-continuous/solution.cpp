class Solution {
  public:
    int minOperations(vector<int> &nums) {
        int length = nums.size();
        sort(nums.begin(), nums.end());
        nums.erase(unique(nums.begin(), nums.end()), nums.end());

        int left = 0;
        int kept = 0;
        for (int right = 0; right < (int)nums.size(); ++right) {
            while ((long long)nums[right] - nums[left] >= length)
                ++left;
            kept = max(kept, right - left + 1);
        }

        return length - kept;
    }
};
