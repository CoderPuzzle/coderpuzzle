class Solution {
  public:
    vector<int> maximumWeight(vector<vector<int>> &intervals) {
        int n = (int)intervals.size();
        // Sort by right endpoint: every pick set is a chain in this order,
        // and sharing any point (even one boundary) means overlapping, so
        // predecessors must end strictly left of the current left end.
        vector<int> order(n);
        for (int t = 0; t < n; ++t)
            order[t] = t;
        sort(order.begin(), order.end(), [&](int a, int b) {
            if (intervals[a][1] != intervals[b][1])
                return intervals[a][1] < intervals[b][1];
            return intervals[a][0] < intervals[b][0];
        });
        vector<int> rights(n);
        for (int t = 0; t < n; ++t)
            rights[t] = intervals[order[t]][1];

        struct State {
            long long score;
            int len;
            array<int, 4> slots;
        };
        const long long neg = -(1LL << 62);
        // Layer k: over prefix length i, best score picking exactly k of
        // the first i sorted intervals plus the lex-smallest index tuple.
        vector<State> prev(n + 1, State{0, 0, {}});
        vector<State> cur(n + 1);
        vector<State> best(5);
        auto lessTup = [](const State &a, const State &b) {
            for (int t = 0; t < max(a.len, b.len); ++t) {
                int va = t < a.len ? a.slots[t] : -1;
                int vb = t < b.len ? b.slots[t] : -1;
                if (va != vb)
                    return va < vb;
            }
            return false;
        };
        for (int k = 1; k <= 4; ++k) {
            cur[0] = State{neg, 0, {}};
            for (int i = 1; i <= n; ++i) {
                cur[i] = cur[i - 1];
                int idx = order[i - 1];
                int left = intervals[idx][0];
                long long weight = intervals[idx][2];
                // Predecessors end strictly left of `left`.
                int j = (int)(lower_bound(rights.begin(), rights.end(), left) - rights.begin());
                if (prev[j].score > neg / 4) {
                    long long candScore = prev[j].score + weight;
                    State cand = prev[j];
                    cand.score = candScore;
                    int pos = cand.len;
                    while (pos > 0 && cand.slots[pos - 1] > idx)
                        --pos;
                    for (int t = cand.len; t > pos; --t)
                        cand.slots[t] = cand.slots[t - 1];
                    cand.slots[pos] = idx;
                    ++cand.len;
                    // Score first; on a tie the smaller index tuple wins.
                    if (candScore > cur[i].score || (candScore == cur[i].score && lessTup(cand, cur[i])))
                        cur[i] = cand;
                }
            }
            best[k] = cur[n];
            swap(prev, cur);
        }

        long long top = neg;
        for (int k = 1; k <= 4; ++k)
            top = max(top, best[k].score);
        const State *winner = nullptr;
        for (int k = 1; k <= 4; ++k) {
            if (best[k].score == top && (winner == nullptr || lessTup(best[k], *winner)))
                winner = &best[k];
        }
        return vector<int>(winner->slots.begin(), winner->slots.begin() + winner->len);
    }
};
