class Solution {
  public:
    long long splitArray(vector<int> &nums) {
        int n = static_cast<int>(nums.size());
        // e ends the longest strictly increasing prefix: a left part
        // nums[0..i] is strictly increasing exactly when i <= e.
        int e = 0;
        while (e + 1 < n && nums[e + 1] > nums[e]) {
            e++;
        }
        // s starts the longest strictly decreasing suffix: a right part
        // nums[i+1..n-1] is strictly decreasing exactly when i + 1 >= s.
        int s = n - 1;
        while (s > 0 && nums[s - 1] > nums[s]) {
            s--;
        }
        // One scan accumulates the left sum; the right sum is the total
        // minus it. Only indices inside the anchor window are scored.
        // Sums reach 10^10, so every accumulator stays in 64 bits.
        long long total = 0;
        for (int x : nums) {
            total += x;
        }
        long long best = -1;
        long long left = 0;
        for (int i = 0; i + 1 < n; i++) {
            left += nums[i];
            if (i + 1 >= s && i <= e) {
                long long diff = left - (total - left);
                if (diff < 0) {
                    diff = -diff;
                }
                if (best == -1 || diff < best) {
                    best = diff;
                }
            }
        }
        return best;
    }
};
