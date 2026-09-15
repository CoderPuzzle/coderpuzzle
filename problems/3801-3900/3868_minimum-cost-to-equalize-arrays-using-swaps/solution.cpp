#include <unordered_map>
#include <unordered_set>
#include <vector>

using namespace std;

class Solution {
  public:
    int minCost(vector<int> &nums1, vector<int> &nums2) {
        // Within-array swaps are free, so only the frequency of each value
        // in each array matters. Both arrays must end with the same
        // multiset: value v appears (cnt1[v] + cnt2[v]) / 2 times in each,
        // which is possible only when that combined count is even. Every
        // count is at most n <= 8e4, so int arithmetic never overflows.
        unordered_map<int, int> cnt1, cnt2;
        unordered_set<int> values;
        for (int v : nums1) {
            cnt1[v]++;
            values.insert(v);
        }
        for (int v : nums2) {
            cnt2[v]++;
            values.insert(v);
        }
        int totalDiff = 0;
        for (int v : values) {
            int a = cnt1[v];
            int b = cnt2[v];
            if ((a + b) % 2 == 1) {
                return -1;
            }
            totalDiff += abs(a - b);
        }
        // Each cross swap moves one surplus element out of nums1 and one out
        // of nums2, fixing two placements at once. The surplus in nums1 is
        // half the positive differences, which is a quarter of the sum of
        // all differences because the two arrays are equally large.
        return totalDiff / 4;
    }
};
