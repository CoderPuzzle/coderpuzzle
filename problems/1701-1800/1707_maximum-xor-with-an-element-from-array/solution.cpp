class Solution {
  public:
    vector<int> maximizeXor(vector<int> &nums, vector<vector<int>> &queries) {
        vector<int> sortedNums = nums;
        sort(sortedNums.begin(), sortedNums.end());
        int nq = queries.size();
        vector<int> order(nq);
        for (int i = 0; i < nq; i++)
            order[i] = i;
        sort(order.begin(), order.end(), [&](int a, int b) {
            if (queries[a][1] != queries[b][1])
                return queries[a][1] < queries[b][1];
            if (queries[a][0] != queries[b][0])
                return queries[a][0] < queries[b][0];
            return a < b;
        });
        vector<int> answers(nq);
        // trie: children stored in flat arrays
        vector<array<int, 2>> child;
        child.reserve(sortedNums.size() * 31 + 4);
        child.push_back({-1, -1});
        int ptr = 0;
        int n = sortedNums.size();
        // Offline: with nums and queries both sorted by threshold, the trie
        // holds exactly the values <= mi when a query runs, so the filter
        // costs nothing at query time.
        for (int oi = 0; oi < nq; oi++) {
            int idx = order[oi];
            int mi = queries[idx][1];
            int xi = queries[idx][0];
            // ptr only moves forward — each number enters the trie once.
            // 30 levels (bit 29 down to 0) cover every value < 2^30.
            while (ptr < n && sortedNums[ptr] <= mi) {
                int node = 0;
                int v = sortedNums[ptr];
                for (int bit = 29; bit >= 0; bit--) {
                    int b = (v >> bit) & 1;
                    if (child[node][b] == -1) {
                        child[node][b] = (int)child.size();
                        child.push_back({-1, -1});
                    }
                    node = child[node][b];
                }
                ptr++;
            }
            if (ptr == 0) {
                // Threshold admits no element yet — no candidate exists.
                answers[idx] = -1;
                continue;
            }
            int node = 0;
            int best = 0;
            // Greedy descent from the MSB: prefer the complement child so
            // this result bit becomes 1; settle for the matching child.
            for (int bit = 29; bit >= 0; bit--) {
                int xb = (xi >> bit) & 1;
                int want = 1 - xb;
                if (child[node][want] != -1) {
                    best |= 1 << bit;
                    node = child[node][want];
                } else {
                    node = child[node][xb];
                }
            }
            answers[idx] = best;
        }
        return answers;
    }
};
