class Solution {
  public:
    vector<int> intersect(vector<int> &nums1, vector<int> &nums2) {
        // Sort both arrays ascending, then walk them with one index each:
        // the smaller current value can no longer be matched and advances
        // alone, while equal currents are a shared copy — both advance
        // together, so every value joins exactly min(count1, count2) times.
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        vector<int> picked;
        int i = 0, j = 0;
        while (i < (int)nums1.size() && j < (int)nums2.size()) {
            if (nums1[i] == nums2[j]) {
                picked.push_back(nums1[i]);
                ++i;
                ++j;
            } else if (nums1[i] < nums2[j]) {
                ++i;
            } else {
                ++j;
            }
        }
        // The walk visits values in ascending order, so the picks leave the
        // loop already in the ascending order the judge requires.
        return picked;
    }
};
