class Solution {
  public:
    int longestSubarray(vector<int> &nums) {
        int best = 0;
        int left = 0;
        int zeros = 0;
        for (int right = 0; right < (int)nums.size(); right++) {
            if (nums[right] == 0)
                zeros++;
            while (zeros > 1) {
                if (nums[left] == 0)
                    zeros--;
                left++;
            }
            best = max(best, right - left + 1);
        }
        // window includes the zero; deleting it costs one slot, but we must
        // delete exactly one element either way
        if (zeros == 0)
            return (int)nums.size() - 1; // all ones, still delete one
        return best - 1;
    }
};
