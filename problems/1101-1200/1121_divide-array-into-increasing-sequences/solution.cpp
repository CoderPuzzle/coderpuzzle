class Solution {
  public:
    bool canDivideIntoSubsequences(vector<int> &nums, int k) {
        // The longest run of equal values forces that many separate
        // sequences; the array is sorted, so runs are contiguous.
        int maxfreq = 1;
        int run = 1;
        for (int i = 1; i < (int)nums.size(); ++i) {
            run = (nums[i] == nums[i - 1]) ? run + 1 : 1;
            if (run > maxfreq)
                maxfreq = run;
        }
        // The product can hit 1e10, past int range — compare in long long.
        return (long long)nums.size() >= (long long)maxfreq * k;
    }
};
