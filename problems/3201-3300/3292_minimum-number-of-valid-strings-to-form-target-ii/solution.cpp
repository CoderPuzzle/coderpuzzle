#include <queue>
#include <string>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int minValidStrings(vector<string> &words, string target) {
        // dp[p] is the minimum number of valid strings forming target[:p];
        // dp[0] is 0 and every other cell starts out unreachable. An
        // Aho-Corasick automaton over words turns one left-to-right scan of
        // target into, at each index j, the length of the longest suffix of
        // target[:j+1] that is a prefix of some word: every automaton state
        // lies on a trie path, so that length is simply the state's depth. A
        // piece ending at j + 1 therefore starts somewhere inside its last r
        // positions, and a min segment tree over finalized dp cells answers
        // each such window in O(log n): point-update dp[j + 1], then move on.
        // The scan stops dead the moment a character extends no word prefix
        // at all - nothing beyond that position is reachable, so the answer
        // is -1 unless the full length was formed. All values fit an int.
        vector<unordered_map<char, int>> children(1);
        vector<int> fail(1, 0);
        for (const string &word : words) {
            int cur = 0;
            for (char ch : word) {
                auto it = children[cur].find(ch);
                if (it == children[cur].end()) {
                    children.emplace_back();
                    fail.push_back(0);
                    int nxt = (int)children.size() - 1;
                    children[cur][ch] = nxt;
                    cur = nxt;
                } else {
                    cur = it->second;
                }
            }
        }
        queue<int> bfs;
        for (const auto &[ch, v] : children[0]) {
            bfs.push(v);
        }
        while (!bfs.empty()) {
            int u = bfs.front();
            bfs.pop();
            for (const auto &[ch, v] : children[u]) {
                int f = fail[u];
                while (f && !children[f].count(ch)) {
                    f = fail[f];
                }
                auto it = children[f].find(ch);
                int nf = it == children[f].end() ? 0 : it->second;
                fail[v] = nf == v ? 0 : nf;
                bfs.push(v);
            }
        }
        vector<int> depth(children.size(), 0);
        for (int u = 0; u < (int)children.size(); u++) {
            for (const auto &[ch, v] : children[u]) {
                depth[v] = depth[u] + 1;
            }
        }
        int n = (int)target.size();
        const int inf = 1 << 30;
        int size = 1;
        while (size < n + 2)
            size <<= 1;
        vector<int> tree(2 * size, inf);
        auto update = [&](int i, int value) {
            i += size;
            tree[i] = value;
            for (i >>= 1; i; i >>= 1) {
                tree[i] = min(tree[2 * i], tree[2 * i + 1]);
            }
        };
        auto query = [&](int lo, int hi) {
            int res = inf;
            for (lo += size, hi += size; lo < hi; lo >>= 1, hi >>= 1) {
                if (lo & 1)
                    res = min(res, tree[lo++]);
                if (hi & 1)
                    res = min(res, tree[--hi]);
            }
            return res;
        };
        update(0, 0);
        int cur = 0;
        for (int j = 0; j < n; j++) {
            char ch = target[j];
            while (cur && !children[cur].count(ch)) {
                cur = fail[cur];
            }
            auto it = children[cur].find(ch);
            cur = it == children[cur].end() ? 0 : it->second;
            if (cur == 0) {
                return -1;
            }
            int lo = j + 1 - depth[cur];
            if (lo < 0)
                lo = 0;
            int best = query(lo, j + 1);
            if (best != inf) {
                update(j + 1, best + 1);
            }
        }
        int ans = query(n, n + 1);
        return ans >= inf ? -1 : ans;
    }
};
