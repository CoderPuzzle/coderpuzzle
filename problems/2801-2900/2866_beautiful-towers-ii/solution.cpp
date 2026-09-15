class Solution {
  public:
    // One monotonic-index sweep per side: popping every strictly taller
    // index before i leaves j, the nearest index with
    // maxHeights[j] <= maxHeights[i]; towers j+1..i clip to the peak
    // height while the prefix up to j keeps its own best mountain, so
    // left[i] = left[j] + maxHeights[i] * (i - j). Sums reach
    // n * max(maxHeights[i]) = 10^5 * 10^9 = 10^14, past int range, so
    // they accumulate in long long; no intermediate exceeds that, far
    // below the ~9.2 * 10^18 long long ceiling.
    long long maximumSumOfHeights(vector<int> &maxHeights) {
        const int n = static_cast<int>(maxHeights.size());
        vector<long long> left(n), right(n);
        vector<int> stack;
        for (int i = 0; i < n; ++i) {
            const long long h = maxHeights[i];
            while (!stack.empty() && maxHeights[stack.back()] > h) {
                stack.pop_back();
            }
            if (stack.empty()) {
                left[i] = h * (i + 1);
            } else {
                const int j = stack.back();
                left[i] = left[j] + h * (i - j);
            }
            stack.push_back(i);
        }
        stack.clear();
        for (int i = n - 1; i >= 0; --i) {
            const long long h = maxHeights[i];
            while (!stack.empty() && maxHeights[stack.back()] > h) {
                stack.pop_back();
            }
            if (stack.empty()) {
                right[i] = h * (n - i);
            } else {
                const int j = stack.back();
                right[i] = right[j] + h * (j - i);
            }
            stack.push_back(i);
        }
        long long best = 0;
        for (int i = 0; i < n; ++i) {
            best = max(best, left[i] + right[i] - maxHeights[i]);
        }
        return best;
    }
};
