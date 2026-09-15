class Solution {
  public:
    int longestValidSubstring(string word, vector<string> &forbidden) {
        const int miss = 1 << 30;
        // Aho-Corasick automaton over the forbidden strings. Children live in
        // one map keyed node * 32 + char, so memory tracks the trie's edge
        // count instead of any alphabet-wide table.
        unordered_map<int, int> children;
        int maxLen = 0;
        for (const string &s : forbidden) {
            maxLen = max(maxLen, (int)s.size());
        }
        vector<vector<int>> levels(maxLen + 1);
        vector<int> fail(1, 0), best(1, miss), parent(1, 0), pch(1, 0);
        for (const string &s : forbidden) {
            int cur = 0;
            for (int i = 0; i < (int)s.size(); i++) {
                int c = s[i] - 'a';
                int key = cur * 32 + c;
                auto it = children.find(key);
                int nxt;
                if (it == children.end()) {
                    nxt = (int)fail.size();
                    children.emplace(key, nxt);
                    fail.push_back(0);
                    best.push_back(miss);
                    parent.push_back(cur);
                    pch.push_back(c);
                    levels[i + 1].push_back(nxt);
                } else {
                    nxt = it->second;
                }
                cur = nxt;
            }
            best[cur] = min(best[cur], (int)s.size());
        }
        // Failure links, breadth-first over depth buckets: fail[u] is the
        // longest proper suffix of u's path that is also a trie path. Folding
        // best along each link tells every node the shortest forbidden string
        // ending there, with no occurrence enumeration at scan time.
        for (int depth = 1; depth <= maxLen; depth++) {
            for (int u : levels[depth]) {
                int c = pch[u];
                int f = fail[parent[u]];
                while (f != 0 && children.count(f * 32 + c) == 0) {
                    f = fail[f];
                }
                int v = 0;
                auto it = children.find(f * 32 + c);
                if (it != children.end()) {
                    v = it->second;
                }
                fail[u] = v == u ? 0 : v;
                best[u] = min(best[u], best[fail[u]]);
            }
        }
        int n = word.size();
        int left = 0;
        int ans = 0;
        int state = 0;
        // Longest-match scan: the state is always the longest suffix of the
        // text that prefixes some forbidden string, so each character costs
        // one amortized-constant hop instead of the window variant's L probes.
        for (int right = 0; right < n; right++) {
            int c = word[right] - 'a';
            while (state != 0 && children.count(state * 32 + c) == 0) {
                state = fail[state];
            }
            auto it = children.find(state * 32 + c);
            state = it != children.end() ? it->second : 0;
            // The shortest forbidden suffix ending at right starts latest --
            // exactly the match the window variant jumps at -- so hopping the
            // left end past its first character keeps the same sweep.
            int m = best[state];
            if (m != miss) {
                left = max(left, right - m + 2);
            }
            ans = max(ans, right - left + 1);
        }
        return ans;
    }
};
