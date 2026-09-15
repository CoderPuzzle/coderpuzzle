class Solution {
  public:
    int sumImbalanceNumbers(vector<int> &nums) {
        int n = nums.size();
        long long total = 0;
        for (int i = 0; i < n; i++) {
            // Seed with the single-element window: its imbalance is 0.
            vector<char> seen(n + 2, 0);
            seen[nums[i]] = 1;
            int cur = 0;
            for (int j = i + 1; j < n; j++) {
                int v = nums[j];
                if (!seen[v]) {
                    bool lo = seen[v - 1];
                    bool hi = seen[v + 1];
                    if (lo && hi) {
                        cur--;
                    } else if (!lo && !hi) {
                        cur++;
                    }
                    seen[v] = 1;
                }
                total += cur;
            }
        }
        return (int)total;
    }
};
