#include <climits>
#include <queue>
#include <vector>

class Solution {
  public:
    long long minOperations(vector<int> &nums, int k) {
        // Equalizing a window costs sum(|x - t|), minimized at a median t.
        // The window slides over two heap halves around the median; running
        // half-sums make each window's cost O(1). Every element packs to
        // the unique key (v + 2^20) << 17 | index so heap keys never tie,
        // which makes lazy deletion exact: the outgoing element routes to
        // its true half by one comparison against the low top, and stale
        // copies are dropped only when they surface at a heap top.
        int n = nums.size();
        priority_queue<long long> low; // max-heap: lower half of the window
        priority_queue<long long, vector<long long>, greater<long long>> high;
        vector<char> delayed(n, 0);
        int lowSize = 0, highSize = 0;
        long long lowSum = 0, highSum = 0;
        long long best = LLONG_MAX;
        auto prune = [&](auto &heap) {
            while (!heap.empty() && delayed[heap.top() & 131071]) {
                delayed[heap.top() & 131071] = 0;
                heap.pop();
            }
        };
        for (int i = 0; i < n; i++) {
            if (i >= k) {
                long long outKey = (((long long)nums[i - k] + 1048576) << 17) | (i - k);
                delayed[i - k] = 1;
                if (outKey <= low.top()) {
                    lowSize--;
                    lowSum -= nums[i - k];
                } else {
                    highSize--;
                    highSum -= nums[i - k];
                }
            }
            long long key = (((long long)nums[i] + 1048576) << 17) | i;
            if ((lowSize == 0 && highSize == 0) || key <= low.top()) {
                low.push(key);
                lowSize++;
                lowSum += nums[i];
            } else {
                high.push(key);
                highSize++;
                highSum += nums[i];
            }
            if (lowSize > highSize + 1) {
                prune(low);
                long long move = low.top();
                low.pop();
                lowSize--;
                lowSum -= (move >> 17) - 1048576;
                high.push(move);
                highSize++;
                highSum += (move >> 17) - 1048576;
            } else if (lowSize < highSize) {
                prune(high);
                long long move = high.top();
                high.pop();
                highSize--;
                highSum -= (move >> 17) - 1048576;
                low.push(move);
                lowSize++;
                lowSum += (move >> 17) - 1048576;
            }
            if (i >= k - 1) {
                prune(low);
                prune(high);
                long long median = (low.top() >> 17) - 1048576;
                long long cost = median * lowSize - lowSum + (highSum - median * highSize);
                best = min(best, cost);
            }
        }
        return best;
    }
};
