class Solution {
  public:
    // Rearrangement inequality: ascending x descending pairing minimizes
    // the sum of products over all rearrangements of nums1.
    long long minProductSum(vector<int> &nums1, vector<int> &nums2) {
        sort(nums1.begin(), nums1.end());
        sort(nums2.rbegin(), nums2.rend());
        long long total = 0;
        for (size_t i = 0; i < nums1.size(); i++) {
            total += (long long)nums1[i] * nums2[i];
        }
        return total;
    }
};
