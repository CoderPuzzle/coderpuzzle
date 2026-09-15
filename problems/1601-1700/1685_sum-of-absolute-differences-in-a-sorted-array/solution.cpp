class Solution {
  public:
    vector<int> getSumAbsoluteDifferences(vector<int> &nums) {
        int n = nums.size();
        long long total = 0;
        for (int x : nums)
            total += x;
        long long prefix = 0;
        vector<int> result;
        result.reserve(n);
        for (int i = 0; i < n; i++) {
            long long x = nums[i];
            // Sorted order dissolves the absolute values: every element left
            // of i is <= x and every element right of i is >= x, so each side
            // collapses into one signed sum.
            // Left part: x*i - prefix, the sum of the first i elements.
            long long left = x * i - prefix;
            long long suffix = total - prefix - x;
            // Right part: suffix sum - x*(n - i - 1).
            long long right = suffix - x * (n - i - 1);
            // Ties are exact — equal values contribute 0 on either side.
            result.push_back((int)(left + right));
            prefix += x;
        }
        return result;
    }
};
