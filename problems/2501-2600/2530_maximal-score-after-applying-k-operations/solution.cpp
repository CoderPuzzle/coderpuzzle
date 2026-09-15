#include <queue>
#include <vector>

class Solution {
  public:
    long long maxKelements(std::vector<int> &nums, int k) {
        // Greedy on the live maximum: picking anything other than the
        // largest element both gains less now and leaves that giant
        // intact, so swapping the order never helps. A max-heap answers
        // each "largest element" query in O(log n) and takes the replaced
        // ceil(value / 3) straight back; score fits 64 bits at k*10^9.
        std::priority_queue<long long> heap(nums.begin(), nums.end());
        long long score = 0;
        for (int op = 0; op < k; ++op) {
            long long value = heap.top();
            heap.pop();
            score += value;
            heap.push((value + 2) / 3);
        }
        return score;
    }
};
