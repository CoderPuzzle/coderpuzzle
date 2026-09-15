class Solution {
  public:
    vector<int> sortByBits(vector<int> &arr) {
        // Popcount (<= 14) shifted above the value (< 2^16): one comparable
        // integer per element carries both key fields.
        vector<int> out(arr);
        sort(out.begin(), out.end(), [](int a, int b) {
            int pa = __builtin_popcount((unsigned)a);
            int pb = __builtin_popcount((unsigned)b);
            return pa != pb ? pa < pb : a < b;
        });
        return out;
    }
};
