class Solution {
  public:
    int maxFrequency(vector<int> &nums, int k) {
        // Operations only raise values, so an optimal equal-value group is a
        // contiguous window in sorted order, raised to its right end.
        vector<int> arr = nums;
        sort(arr.begin(), arr.end());
        long long best = 1;
        int left = 0;
        long long windowSum = 0;
        for (int right = 0; right < (int)arr.size(); right++) {
            long long value = arr[right];
            windowSum += value;
            // Cost = width * target - window sum, the increments needed to
            // lift everything to the right end; drop the smallest member
            // while the budget is exceeded.
            while ((long long)(right - left + 1) * value - windowSum > k) {
                windowSum -= arr[left];
                left++;
            }
            // Once a length is affordable, every shorter window is too.
            best = max(best, (long long)(right - left + 1));
        }
        return (int)best;
    }
};
