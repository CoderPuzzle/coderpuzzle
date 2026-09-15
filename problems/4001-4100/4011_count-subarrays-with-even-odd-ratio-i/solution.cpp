class Solution {
  public:
    long long countRatioSubarrays(vector<int> &nums, int a, int b) {
        // Only element parity matters. Fix the left endpoint and extend the
        // right endpoint, carrying running even/odd counts so every subarray
        // is tested exactly once with its exact counts.
        long long total = 0;
        int n = nums.size();
        for (int left = 0; left < n; ++left) {
            int even = 0;
            int odd = 0;
            for (int right = left; right < n; ++right) {
                if (nums[right] % 2 == 0)
                    ++even;
                else
                    ++odd;
                // Valid iff y > 0 and x/y <= a/b; with positive denominators
                // that is exactly b*even <= a*odd.
                if (odd > 0 && (long long)b * even <= (long long)a * odd)
                    ++total;
            }
        }
        return total;
    }
};
