class Solution {
  public:
    int findCrossingTime(int n, int k, vector<vector<int>> &time) {
        // Priority is static per worker: least efficient = larger left+right,
        // ties to the larger index. Encoded as min-key (-eff, -i).
        using Key = pair<int, int>; // {-eff, -i}, smaller wins
        priority_queue<Key, vector<Key>, greater<Key>> left, right;
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>>
            pending; // {readyTime, join-side 1=right 0=left, i}
        for (int i = 0; i < k; i++) {
            left.push({-(time[i][0] + time[i][2]), -i});
        }
        long long cur = 0; // instant the bridge becomes free again
        int sent = 0;
        int delivered = 0;
        int ans = 0;
        while (delivered < n) {
            while (!pending.empty() && get<0>(pending.top()) <= cur) {
                auto [_, side, i] = pending.top();
                pending.pop();
                (side == 1 ? right : left).push({-(time[i][0] + time[i][2]), -i});
            }
            if (!right.empty()) {
                // A boxed worker on the right bank always has priority.
                int i = -right.top().second;
                right.pop();
                cur += time[i][2];
                delivered++;
                ans = max(ans, (int)cur); // box reaches the left bank here
                if (delivered == n)
                    break; // the final put never delays anything
                pending.push({cur + time[i][3], 0, i});
            } else if (!left.empty() && sent < n) {
                int i = -left.top().second;
                left.pop();
                cur += time[i][0];
                sent++;
                pending.push({cur + time[i][1], 1, i});
            } else {
                // Nobody can cross yet: jump to the next readiness instant.
                cur = get<0>(pending.top());
            }
        }
        return ans;
    }
};
