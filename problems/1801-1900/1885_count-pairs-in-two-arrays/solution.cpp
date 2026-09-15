class Solution {
  public:
    // d[i] = nums1[i]-nums2[i]; count pairs with d[i]+d[j] > 0 by two
    // pointers over sorted d: d[l]+d[r] > 0 means all of l+1..r-1 also
    // pair with r, so add r-l and move r down.
    long long countPairs(vector<int> &nums1, vector<int> &nums2) {
        int n = nums1.size();
        vector<int> d(n);
        for (int i = 0; i < n; i++)
            d[i] = nums1[i] - nums2[i];
        sort(d.begin(), d.end());
        long long total = 0;
        int l = 0, r = n - 1;
        while (l < r) {
            if (d[l] + d[r] > 0) {
                total += r - l;
                r--;
            } else {
                l++;
            }
        }
        return total;
    }
};
