#include <algorithm>
#include <vector>

class Solution {
  public:
    int minimumTime(vector<int> &nums1, vector<int> &nums2, int x) {
        // Exchange arguments: each index needs zeroing at most once ("shift
        // left" removes repeats), and among the kept zeroings larger rates
        // belong later - taking element e as operation j removes
        // nums1[e] + nums2[e] * j of the eventual sum. Sort ascending by rate.
        const int n = static_cast<int>(nums1.size());
        vector<int> order(n);
        for (int index = 0; index < n; ++index) {
            order[index] = index;
        }
        sort(order.begin(), order.end(), [&](int left, int right) { return nums2[left] < nums2[right]; });
        long long base = 0;
        long long growth = 0;
        for (int index = 0; index < n; ++index) {
            base += nums1[index];
            growth += nums2[index];
        }
        // Best[j] = the most removable using exactly j operations among the
        // elements processed so far; sums reach ~10^9 where an i32 would be
        // tight, so i64 carries all intermediates.
        vector<long long> best(n + 1);
        for (int position = 1; position <= n; ++position) {
            const int index = order[position - 1];
            const long long initial = nums1[index];
            const long long rate = nums2[index];
            for (int count = position; count >= 1; --count) {
                const long long candidate = best[count - 1] + initial + rate * count;
                if (candidate > best[count]) {
                    best[count] = candidate;
                }
            }
        }
        for (long long time = 0; time <= n; ++time) {
            if (base + growth * time - best[time] <= x) {
                return static_cast<int>(time);
            }
        }
        return -1;
    }
};
