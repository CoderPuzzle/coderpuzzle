class Solution {
  public:
    int maxNonDecreasingLength(vector<int> &nums1, vector<int> &nums2) {
        // run1/run2: longest non-decreasing run ending exactly at this index,
        // choosing nums1[i] / nums2[i]. Each transition compares against both
        // previous picks under >=, so a run may switch source arrays anywhere.
        int run1 = 1, run2 = 1, best = 1;
        for (int i = 1; i < (int)nums1.size(); ++i) {
            int next1 = 1;
            if (nums1[i] >= nums1[i - 1])
                next1 = max(next1, run1 + 1);
            if (nums1[i] >= nums2[i - 1])
                next1 = max(next1, run2 + 1);
            int next2 = 1;
            if (nums2[i] >= nums1[i - 1])
                next2 = max(next2, run1 + 1);
            if (nums2[i] >= nums2[i - 1])
                next2 = max(next2, run2 + 1);
            run1 = next1;
            run2 = next2;
            best = max(best, max(next1, next2));
        }
        return best;
    }
};
