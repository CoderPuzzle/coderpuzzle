class Solution {
  public:
    vector<int> merge(vector<int> &nums1, int m, vector<int> &nums2, int n) {
        // Fill nums1 from the back so the largest elements land last: the n
        // tail slots are declared scratch, and a write at m+n-1 moving down
        // can never pass an unread nums1 element.
        int i = m - 1, j = n - 1;
        for (int write = m + n - 1; j >= 0; write--) {
            if (i >= 0 && nums1[i] > nums2[j]) {
                nums1[write] = nums1[i];
                i--;
            } else {
                nums1[write] = nums2[j];
                j--;
            }
        }
        // nums2 is exhausted: any nums1 prefix left unread is already in place.
        return nums1;
    }
};
