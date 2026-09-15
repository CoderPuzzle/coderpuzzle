class Solution {
  public:
    vector<int> smallestRange(vector<vector<int>> &nums) {
        // min-heap of (value, list index, element index)
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        // Seed the heap with every list's head; the k-way merge sweeps candidate
        // ranges in order as the selection's minimum advances.
        int curMax = INT_MIN;
        for (int i = 0; i < (int)nums.size(); i++) {
            heap.emplace(nums[i][0], i, 0);
            if (nums[i][0] > curMax)
                curMax = nums[i][0];
        }
        long long bestLo = 0, bestHi = 0;
        bool have = false;
        while (true) {
            auto [lo, i, j] = heap.top();
            heap.pop();
            // [lo, curMax] covers all k lists: prefer smaller width, then
            // the smaller left endpoint on ties.
            if (!have || (long long)curMax - lo < bestHi - bestLo ||
                ((long long)curMax - lo == bestHi - bestLo && lo < bestLo)) {
                bestLo = lo;
                bestHi = curMax;
                have = true;
            }
            if (j + 1 == (int)nums[i].size()) {
                // The popped list is exhausted: no later selection can still
                // include it, so every further candidate would be worse.
                return {(int)bestLo, (int)bestHi};
            }
            int nxt = nums[i][j + 1];
            // The next element may raise the tracked maximum.
            if (nxt > curMax)
                curMax = nxt;
            heap.emplace(nxt, i, j + 1);
        }
    }
};
