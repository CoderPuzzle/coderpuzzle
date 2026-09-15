#include <functional>
#include <queue>
#include <vector>

class Solution {
  public:
    long long minMoves(vector<int> &balance) {
        int n = balance.size();
        long long sum = 0;
        for (int x : balance)
            sum += x;
        if (sum < 0)
            return -1;
        if (n == 1)
            return 0;
        // total cost H(t) = |t| + internal line cost is convex in t; binary
        // search the integer minimizer
        long long bound = total(balance, 0);
        long long lo = -bound, hi = bound;
        while (lo < hi) {
            long long mid = lo + (hi - lo) / 2;
            if (total(balance, mid) <= total(balance, mid + 1)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return total(balance, lo);
    }

  private:
    static long long total(const vector<int> &balance, long long t) {
        long long inner = lineCost(balance, t);
        return (t < 0 ? -t : t) + inner;
    }

    // Minimum flow cost on the path 0..n-2 with the wrap edge fixed at
    // signed flow t: sweep positions keeping the convex suffix-min envelope
    // of the DP as a constant plus rising-flank breakpoints.
    static long long lineCost(const vector<int> &balance, long long t) {
        int n = balance.size();
        long long cost = 0;
        long long delta = 0;
        priority_queue<long long, vector<long long>, greater<long long>> heap;
        for (int k = 0; k + 1 < n; k++) {
            delta += balance[k];
            long long cap = delta;
            long long z = -t;
            if (!heap.empty()) {
                long long low = heap.top() + delta;
                if (z <= low) {
                    heap.push(z - delta);
                } else if (z <= cap) {
                    // valley below the current minimum: consume it and split
                    // the flank in two inside the support
                    cost += z - low;
                    heap.pop();
                    heap.push(z - delta);
                    heap.push(z - delta);
                } else {
                    // valley beyond the capped support: lowest breakpoint is
                    // absorbed into the constant
                    cost += z - low;
                    heap.pop();
                }
            } else if (z <= cap) {
                heap.push(z - delta);
            } else {
                cost += z - cap;
            }
        }
        long long limit = -(long long)balance[n - 1];
        while (!heap.empty() && heap.top() + delta < limit) {
            cost += limit - (heap.top() + delta);
            heap.pop();
        }
        return cost;
    }
};
