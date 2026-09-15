class Solution {
  public:
    long long gcdSum(vector<int> &nums) {
        // prefixGcd[i] is gcd(nums[i], running max so far). Once built, the
        // sorted list is paired smallest-with-largest, and each pair's gcd
        // is summed — a two-pointer walk from both ends. Widen to long long:
        // the sum of up to 5e4 gcds, each as large as 1e9, reaches ~5e13.
        vector<long long> prefixGcd;
        prefixGcd.reserve(nums.size());
        long long running = 0;
        for (int value : nums) {
            running = max(running, (long long)value);
            prefixGcd.push_back(gcd(value, running));
        }
        sort(prefixGcd.begin(), prefixGcd.end());
        int lo = 0;
        int hi = (int)prefixGcd.size() - 1;
        long long total = 0;
        while (lo < hi) {
            total += gcd(prefixGcd[lo], prefixGcd[hi]);
            lo++;
            hi--;
        }
        return total;
    }

  private:
    long long gcd(long long a, long long b) {
        while (b != 0) {
            long long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
};
