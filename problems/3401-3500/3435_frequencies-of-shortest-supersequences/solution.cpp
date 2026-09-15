class Solution {
    vector<vector<int>> adj;
    vector<int> state; // 0 unvisited, 1 visiting, 2 done

    bool dfs(int c) {
        state[c] = 1;
        for (int nxt : adj[c]) {
            if (state[nxt] == 1)
                return true;
            if (state[nxt] == 0 && dfs(nxt))
                return true;
        }
        state[c] = 2;
        return false;
    }

    // Induced subgraph on chars not in t must be acyclic.
    bool isDag(int t, const vector<pair<int, int>> &nonSelf, int m) {
        for (int i = 0; i < m; i++) {
            adj[i].clear();
            state[i] = 0;
        }
        for (auto &[a, b] : nonSelf) {
            if (!((t >> a) & 1) && !((t >> b) & 1)) {
                adj[a].push_back(b);
            }
        }
        for (int c = 0; c < m; c++) {
            if ((t >> c) & 1)
                continue;
            if (state[c] == 0 && dfs(c))
                return false;
        }
        return true;
    }

  public:
    vector<vector<int>> supersequences(vector<string> &words) {
        vector<int> chars; // bit i set -> letter 'a'+i present
        for (string &w : words) {
            chars.push_back(w[0] - 'a');
            chars.push_back(w[1] - 'a');
        }
        sort(chars.begin(), chars.end());
        chars.erase(unique(chars.begin(), chars.end()), chars.end());
        int m = (int)chars.size();

        int forced = 0;
        vector<pair<int, int>> nonSelf;
        for (string &w : words) {
            int a = w[0] - 'a', b = w[1] - 'a';
            int ia = (int)(lower_bound(chars.begin(), chars.end(), a) - chars.begin());
            int ib = (int)(lower_bound(chars.begin(), chars.end(), b) - chars.begin());
            if (a == b) {
                forced |= 1 << ia;
            } else {
                nonSelf.push_back({ia, ib});
            }
        }

        adj.assign(m, {});
        state.assign(m, 0);

        int bestLen = -1;
        vector<vector<int>> results;
        for (int mask = 0; mask < (1 << m); mask++) {
            if ((forced & mask) != forced)
                continue;
            if (!isDag(mask, nonSelf, m))
                continue;
            int length = m + __builtin_popcount((unsigned)mask);
            vector<int> freq(26, 0);
            for (int i = 0; i < m; i++) {
                freq[chars[i]] = ((mask >> i) & 1) ? 2 : 1;
            }
            if (bestLen == -1 || length < bestLen) {
                bestLen = length;
                results.clear();
                results.push_back(freq);
            } else if (length == bestLen) {
                results.push_back(freq);
            }
        }

        sort(results.begin(), results.end());
        results.erase(unique(results.begin(), results.end()), results.end());
        return results;
    }
};
