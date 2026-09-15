class Solution {
  public:
    int minimumAddedInteger(vector<int> &nums1, vector<int> &nums2) {
        // Sorted correspondence forces x = min(nums2) - keptMin, and two
        // removals leave the kept minimum at sorted index <= 2, so only the
        // three candidates nums2min - sorted(nums1)[r] for r in {0,1,2} can
        // work. Each candidate is validated by consuming a count of nums1
        // against every nums2 element minus x (x and every lookup stay in
        // [-1000, 2000], inside 32-bit range); the smallest survivor wins.
        vector<int> sa = nums1;
        sort(sa.begin(), sa.end());
        int loB = INT_MAX;
        for (int v : nums2)
            loB = min(loB, v);
        int best = INT_MAX;
        for (int r = 0; r < 3; r++) {
            int x = loB - sa[r];
            unordered_map<int, int> pool;
            for (int v : nums1)
                pool[v]++;
            bool ok = true;
            for (int v : nums2) {
                auto it = pool.find(v - x);
                if (it == pool.end() || it->second == 0) {
                    ok = false;
                    break;
                }
                it->second--;
            }
            if (ok && x < best)
                best = x;
        }
        return best;
    }
};
