class Solution {
  public:
    long long maxValue(vector<vector<int>> &events, int k) {
        // Sorted by end day, any compatible set read by finish time is a
        // subsequence of this order, so earlier choices sit to the left.
        sort(events.begin(), events.end(), [](const vector<int> &a, const vector<int> &b) { return a[1] < b[1]; });
        int n = (int)events.size();
        vector<int> ends(n);
        for (int i = 0; i < n; i++) {
            ends[i] = events[i][1];
        }
        // prev[i]: best value using the first i sorted events with one fewer
        // allowed attendance.
        vector<long long> prev(n + 1, 0);
        int rounds = min(k, n);
        for (int j = 0; j < rounds; j++) {
            vector<long long> cur(n + 1, 0);
            long long best = 0;
            for (int i = 1; i <= n; i++) {
                // Events ending strictly before this start are exactly the
                // first p sorted events (strict: may not start the day
                // another ends).
                int p = lower_bound(ends.begin(), ends.end(), events[i - 1][0]) - ends.begin();
                long long take = prev[p] + events[i - 1][2];
                // The running max carries the skip option forward.
                if (take > best) {
                    best = take;
                }
                cur[i] = best;
            }
            prev = cur;
        }
        return prev[n];
    }
};
