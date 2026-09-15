class Solution {
  public:
    int addedInteger(vector<int> &nums1, vector<int> &nums2) {
        // Adding one constant x to every element of nums1 shifts its minimum
        // by exactly x, so x = min(nums2) - min(nums1) is forced; the input
        // guarantee promises that this x reproduces nums2's multiset, and
        // any pair admitting some x admits only one. Values stay in
        // [-1000, 1000], inside 32-bit range.
        int lo1 = INT_MAX, lo2 = INT_MAX;
        for (size_t i = 0; i < nums1.size(); i++) {
            lo1 = min(lo1, nums1[i]);
            lo2 = min(lo2, nums2[i]);
        }
        return lo2 - lo1;
    }
};
