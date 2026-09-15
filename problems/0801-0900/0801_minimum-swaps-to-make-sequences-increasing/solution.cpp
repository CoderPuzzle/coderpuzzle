class Solution {
  public:
    int minSwap(vector<int> &nums1, vector<int> &nums2) {
        const int INF = INT_MAX / 2;
        int n = nums1.size();
        // Only two configurations matter per index — pair kept or
        // swapped — and swap starts at 1: swapping index 0 costs one op.
        int keep = 0;
        int swap = 1;
        for (int i = 1; i < n; i++) {
            int nkeep = INF;
            int nswap = INF;
            int a1 = nums1[i - 1], b1 = nums2[i - 1];
            int a2 = nums1[i], b2 = nums2[i];
            // Natural ordering licenses consistent choices: keep
            // follows keep, swap follows swap (paying one more op).
            if (a1 < a2 && b1 < b2) {
                nkeep = min(nkeep, keep);
                nswap = min(nswap, swap + 1);
            }
            // Crossed ordering licenses flipping the choice at i
            // relative to i-1.
            if (a1 < b2 && b1 < a2) {
                nkeep = min(nkeep, swap);
                nswap = min(nswap, keep + 1);
            }
            // Both conditions may hold; solvability guarantees one does.
            keep = nkeep;
            swap = nswap;
        }
        return min(keep, swap);
    }
};
