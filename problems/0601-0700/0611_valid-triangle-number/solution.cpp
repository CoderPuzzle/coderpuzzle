class Solution {
  public:
    int triangleNumber(vector<int> &nums) {
        vector<int> sorted(nums);
        sort(sorted.begin(), sorted.end());
        int n = (int)sorted.size();
        int count = 0;
        // Fix the largest side; sorted order leaves a + b > c as the only check needed.
        for (int i = n - 1; i > 1; i--) {
            // First zero seen from the top means every remaining side is 0 too.
            if (sorted[i] == 0)
                break;
            int lo = 0, hi = i - 1;
            while (lo < hi) {
                if (sorted[lo] + sorted[hi] > sorted[i]) {
                    // Sum already suffices at the leftmost lo, so every index
                    // up to hi - 1 also pairs with hi: hi - lo triplets at once.
                    count += hi - lo;
                    hi--;
                } else {
                    // Too small even at the rightmost partner; only lo can move up.
                    lo++;
                }
            }
        }
        return count;
    }
};
