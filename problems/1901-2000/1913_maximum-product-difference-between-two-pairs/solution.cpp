class Solution {
  public:
    int maxProductDifference(vector<int> &nums) {
        // Every value is positive, so the difference is maximized by the
        // product of the two largest values minus the product of the two
        // smallest; one streaming pass maintains all four extremes. The
        // extreme product 1e4 * 1e4 = 1e8 fits comfortably in an int.
        int m1 = 0;
        int m2 = 0;
        int s1 = 1000000000;
        int s2 = 1000000000;
        for (int x : nums) {
            if (x > m1) {
                m2 = m1;
                m1 = x;
            } else if (x > m2) {
                m2 = x;
            }
            if (x < s1) {
                s2 = s1;
                s1 = x;
            } else if (x < s2) {
                s2 = x;
            }
        }
        return m1 * m2 - s1 * s2;
    }
};
