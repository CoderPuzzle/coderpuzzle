class Solution {
  public:
    double equalizeWater(vector<int> &buckets, int loss) {
        double low = 0.0;
        double high = *max_element(buckets.begin(), buckets.end());
        double retained = (100.0 - loss) / 100.0;
        for (int iteration = 0; iteration < 100; ++iteration) {
            double middle = (low + high) / 2.0;
            double needed = 0.0;
            double available = 0.0;
            for (int water : buckets) {
                if (water < middle) {
                    needed += middle - water;
                } else {
                    available += water - middle;
                }
            }
            if (available * retained >= needed) {
                low = middle;
            } else {
                high = middle;
            }
        }
        return low;
    }
};
