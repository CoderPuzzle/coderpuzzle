class Solution {
  public:
    int equalSubstring(string s, string t, int maxCost) {
        // cost[i] = |s[i] - t[i]|; find the longest subarray of costs whose
        // sum stays at most maxCost. A sliding window keeps one pass.
        int n = (int)s.size();
        vector<int> costs(n);
        for (int i = 0; i < n; ++i)
            costs[i] = abs(s[i] - t[i]);
        int left = 0, windowCost = 0, best = 0;
        for (int right = 0; right < n; ++right) {
            windowCost += costs[right];
            // Non-negative costs: shrink from the left until affordable.
            while (windowCost > maxCost) {
                windowCost -= costs[left++];
            }
            best = max(best, right - left + 1);
        }
        return best;
    }
};
