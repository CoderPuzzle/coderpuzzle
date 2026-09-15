class Solution {
  public:
    bool uniformArray(vector<int> &nums1) {
        // All-even needs 0 odd elements, or at least 2 so each odd can
        // subtract another odd; all-odd needs at least one odd for the
        // even elements to subtract. One of the two always holds.
        int odd = 0;
        for (int x : nums1) {
            if (x & 1) {
                odd++;
            }
        }
        bool allEvenOk = odd == 0 || odd >= 2;
        bool allOddOk = odd >= 1;
        return allEvenOk || allOddOk;
    }
};
