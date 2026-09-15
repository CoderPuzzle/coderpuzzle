class Solution {
  public:
    long long maxCaloriesBurnt(vector<int> &heights) {
        // Sorted extremes alternate through the routine: the largest
        // remaining height takes each even index (descending), the smallest
        // takes each odd index (ascending), so every edge spans the widest
        // gap available and the first jump claims the tallest block.
        vector<int> s(heights);
        sort(s.begin(), s.end());
        const int n = static_cast<int>(s.size());
        vector<int> arr(n);
        int lo = 0, hi = n - 1;
        for (int index = 0; index < n; ++index) {
            if (index % 2 == 0) {
                arr[index] = s[hi--];
            } else {
                arr[index] = s[lo++];
            }
        }
        // Squared gaps reach ~10^10 and totals approach 10^15: widen to
        // long long before multiplying, an int square overflows at once.
        long long total = static_cast<long long>(arr[0]) * arr[0];
        for (int index = 1; index < n; ++index) {
            const long long gap = arr[index - 1] - arr[index];
            total += gap * gap;
        }
        return total;
    }
};
