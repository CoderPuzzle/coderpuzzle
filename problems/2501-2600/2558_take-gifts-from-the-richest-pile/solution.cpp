#include <cmath>
#include <queue>
#include <vector>

class Solution {
  public:
    long long pickGifts(std::vector<int> &gifts, int k) {
        // Live-maximum simulation: each second the richest pile shrinks
        // to floor(sqrt(value)), which only ever lowers it, so a
        // max-heap replays the process; ties change nothing because any
        // pick order yields the same multiset. The answer is bounded by
        // 10^3 piles * 10^9 gifts = 10^12, so it needs 64 bits; sqrt
        // guesses are corrected with exact integer squares.
        std::priority_queue<long long> heap(gifts.begin(), gifts.end());
        for (int s = 0; s < k; ++s) {
            long long value = heap.top();
            heap.pop();
            long long root = static_cast<long long>(std::sqrt(static_cast<double>(value)));
            while (root * root > value)
                --root;
            while ((root + 1) * (root + 1) <= value)
                ++root;
            heap.push(root);
        }
        long long total = 0;
        while (!heap.empty()) {
            total += heap.top();
            heap.pop();
        }
        return total;
    }
};
