class Solution {
  public:
    long long minimumTotalCost(vector<int> &nums1, vector<int> &nums2) {
        // Pay every equal column tentatively and histogram their values;
        // buy the cheapest neutral columns while one value dominates the
        // chosen set. The total reaches n*(n-1)/2 ~ 5e9, hence long long.
        long long cost = 0;
        unordered_map<int, int> cnt;
        int chosen = 0;
        int dom = -1; // values are >= 1, so -1 can never be a real key
        for (int i = 0; i < (int)nums1.size(); ++i) {
            if (nums1[i] == nums2[i]) {
                int c = ++cnt[nums1[i]];
                if (c > cnt[dom]) {
                    dom = nums1[i];
                }
                ++chosen;
                cost += i;
            }
        }
        if (chosen == 0) {
            return 0;
        }
        for (int j = 0; j < (int)nums1.size() && cnt[dom] * 2 > chosen; ++j) {
            if (nums1[j] != nums2[j] && nums1[j] != dom && nums2[j] != dom) {
                ++chosen;
                cost += j;
            }
        }
        return cnt[dom] * 2 <= chosen ? cost : -1;
    }
};
