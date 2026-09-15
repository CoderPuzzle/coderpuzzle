class Solution {
  public:
    int missingNumber(vector<int> &nums) {
        long long n = nums.size();
        // Sum what is actually present in a 64-bit accumulator.
        long long total = 0;
        for (int value : nums) {
            total += value;
        }
        // n distinct values from 0..n: the one absent value is the full-range
        // total n(n+1)/2 minus this sum. n and n+1 are consecutive, so the
        // product is always even and the division by 2 is exact.
        return (int)(n * (n + 1) / 2 - total);
    }
};
