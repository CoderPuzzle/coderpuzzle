class Solution {
  public:
    string alienOrder(vector<string> &words) {
        const int A = 26;
        array<bool, 26> present{};
        for (const auto &w : words)
            for (char c : w)
                present[c - 'a'] = true;
        int total = 0;
        for (int c = 0; c < A; ++c)
            if (present[c])
                ++total;

        array<set<int>, 26> adj;
        array<int, 26> indeg{};
        for (size_t i = 0; i + 1 < words.size(); ++i) {
            const string &prev = words[i];
            const string &nxt = words[i + 1];
            if (prev.size() > nxt.size() && prev.compare(0, nxt.size(), nxt) == 0)
                return ""; // longer word before its own prefix -> invalid
            size_t m = min(prev.size(), nxt.size());
            for (size_t j = 0; j < m; ++j) {
                int a = prev[j] - 'a', b = nxt[j] - 'a';
                if (a != b) {
                    if (adj[a].insert(b).second)
                        ++indeg[b];
                    break;
                }
            }
        }

        // Kahn's algorithm always taking the smallest available letter
        // (equivalent to a min-heap of ready characters).
        array<bool, 26> done{};
        string order;
        order.reserve(total);
        for (int count = 0; count < total; ++count) {
            int ch = -1;
            for (int c = 0; c < A; ++c) {
                if (present[c] && !done[c] && indeg[c] == 0) {
                    ch = c;
                    break;
                }
            }
            if (ch < 0)
                return ""; // cycle -> invalid
            done[ch] = true;
            order.push_back((char)('a' + ch));
            for (int nb : adj[ch])
                --indeg[nb];
        }
        return order;
    }
};
