class Solution {
  public:
    int maximumProduct(vector<int> &nums) {
        // Only two triples can hold the maximum: the three largest values,
        // or the largest value times the two smallest — two negatives whose
        // product is a big positive. Track all five extremes in one pass;
        // no sort needed.
        int max1 = INT_MIN, max2 = INT_MIN, max3 = INT_MIN;
        int min1 = INT_MAX, min2 = INT_MAX;
        for (int value : nums) {
            if (value >= max1) {
                max3 = max2;
                max2 = max1;
                max1 = value;
            } else if (value >= max2) {
                max3 = max2;
                max2 = value;
            } else if (value > max3) {
                max3 = value;
            }
            if (value <= min1) {
                min2 = min1;
                min1 = value;
            } else if (value < min2) {
                min2 = value;
            }
        }
        // n >= 3 replaces every sentinel, and three values bounded by 1000
        // in magnitude keep each candidate within 10^9 — inside int range
        // (2^31 - 1 is about 2.15 * 10^9). The products are still formed
        // as long long before the comparison, per the house rule.
        long long top = (long long)max1 * max2 * max3;
        long long spread = (long long)min1 * min2 * max1;
        return int(max(top, spread));
    }
};
