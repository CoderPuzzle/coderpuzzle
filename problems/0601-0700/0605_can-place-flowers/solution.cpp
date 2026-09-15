class Solution {
  public:
    bool canPlaceFlowers(vector<int> &flowerbed, int n) {
        // Greedy left-to-right scan: plant any empty plot whose previous
        // and next plots are both empty, reading a missing neighbor at
        // either end as empty. A plant never blocks more than it enables,
        // so the running count is the bed's true capacity.
        int count = 0;
        int prev = 0;
        const int size = static_cast<int>(flowerbed.size());
        for (int i = 0; i < size; ++i) {
            int nxt = i + 1 < size ? flowerbed[i + 1] : 0;
            if (flowerbed[i] == 0 && prev == 0 && nxt == 0) {
                ++count;
                prev = 1;
            } else {
                // prev carries the previous plot's effective value: 1 when a
                // flower was just planted there, otherwise the plot as read.
                prev = flowerbed[i];
            }
        }
        return count >= n;
    }
};
