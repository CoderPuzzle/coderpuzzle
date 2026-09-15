class Solution {
  public:
    int minimumDeviation(vector<int> &nums) {
        priority_queue<int> heap;
        // Normalize: odd values are doubled once — their only upward move —
        // so afterwards every element can only shrink by halving, and every
        // reachable configuration is still visited.
        int currentMin = INT_MAX;
        for (int v : nums) {
            int m = v % 2 == 1 ? v * 2 : v;
            heap.push(m);
            // The heap yields the maximum; the minimum is tracked separately.
            currentMin = min(currentMin, m);
        }
        // Snapshot the untouched configuration before any halving.
        int best = heap.top() - currentMin;
        // An even maximum can still be halved; once the maximum is odd
        // nothing can grow, so the deviation can never improve again.
        while (heap.top() % 2 == 0) {
            int half = heap.top() / 2;
            heap.pop();
            heap.push(half);
            currentMin = min(currentMin, half);
            // Re-check max − min after each halving.
            best = min(best, heap.top() - currentMin);
        }
        return best;
    }
};
