class Solution {
  public:
    long long numberOfSubsequences(vector<int> &nums) {
        // nums[p] * nums[r] == nums[q] * nums[s] rearranges to
        // nums[p] / nums[q] == nums[s] / nums[r]: a leading pair (p, q) and a
        // trailing pair (r, s) sharing one reduced fraction. Sweep r left to
        // right; when r clears q + 2 the pair (p, q) joins the counter, and
        // every (r, s) with s >= r + 2 looks its fraction up.
        unordered_map<int, int> counts;
        counts.reserve(nums.size() * nums.size() / 4 + 1);
        long long total = 0;
        for (int r = 0; r < (int)nums.size(); ++r) {
            if (r >= 2) {
                int q = r - 2;
                for (int p = 0; p <= q - 2; ++p) {
                    int divisor = gcd(nums[p], nums[q]);
                    int key = (nums[p] / divisor) * 1001 + nums[q] / divisor;
                    counts[key]++;
                }
            }
            for (int s = r + 2; s < (int)nums.size(); ++s) {
                int divisor = gcd(nums[s], nums[r]);
                int key = (nums[s] / divisor) * 1001 + nums[r] / divisor;
                auto found = counts.find(key);
                if (found != counts.end()) {
                    total += found->second;
                }
            }
        }
        return total;
    }
};
