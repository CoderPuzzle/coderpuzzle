class Solution {
  public:
    int maximumSetSize(vector<int> &nums1, vector<int> &nums2) {
        unordered_set<int> s1(nums1.begin(), nums1.end());
        unordered_set<int> s2(nums2.begin(), nums2.end());

        // Count values unique to each side and the shared remainder.
        int only1 = 0;
        for (int v : s1) {
            if (!s2.count(v)) {
                ++only1;
            }
        }
        int only2 = 0;
        for (int v : s2) {
            if (!s1.count(v)) {
                ++only2;
            }
        }
        int common = (int)s1.size() - only1;

        // Each side spends its slots on unique values first; leftover slots
        // add at most one new element each, and only common values qualify,
        // each counting once no matter which side inserts it.
        int half = (int)nums1.size() / 2;
        int a = min(half, only1);
        int b = min(half, only2);
        return a + b + min(common, (int)nums1.size() - a - b);
    }
};
