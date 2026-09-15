class Solution {
  public:
    vector<int> longestCommonPrefix(vector<string> &words, int k) {
        int n = (int)words.size();
        // With one word gone there are fewer than k words, so no prefix survives.
        if (n - 1 < k) {
            return vector<int>(n, 0);
        }

        long long total = 0;
        int maxLen = 0;
        for (auto &w : words) {
            total += (long long)w.size();
            maxLen = max(maxLen, (int)w.size());
        }
        int cap = (int)total + 1;
        vector<int> children(cap * 26, -1);
        vector<int> cnt(cap, 0);
        vector<int> depth(cap, 0);
        int nodes = 1;
        // A trie node at depth d is a prefix of length d shared by cnt words.
        for (auto &w : words) {
            int cur = 0;
            cnt[0]++;
            for (char ch : w) {
                int idx = cur * 26 + (ch - 'a');
                if (children[idx] == -1) {
                    children[idx] = nodes;
                    depth[nodes] = depth[cur] + 1;
                    nodes++;
                }
                cur = children[idx];
                cnt[cur]++;
            }
        }

        vector<int> top1(maxLen + 1, -1), top2(maxLen + 1, -1);
        // Keep the two distinct nodes per depth with cnt >= k: if the removed
        // word's path covers the best one, the second is still off that path.
        for (int node = 0; node < nodes; node++) {
            if (cnt[node] >= k) {
                int d = depth[node];
                if (top1[d] == -1)
                    top1[d] = node;
                else if (top2[d] == -1)
                    top2[d] = node;
            }
        }
        vector<int> depths;
        for (int d = maxLen; d >= 0; d--) {
            if (top1[d] != -1)
                depths.push_back(d);
        }

        vector<int> stamp(nodes, 0);
        vector<int> ans(n);
        for (int wi = 0; wi < n; wi++) {
            string &w = words[wi];
            int tag = wi + 1;
            // A unique timestamp marks this word's trie path; old marks never match.
            stamp[0] = tag;
            int cur = 0;
            int big = 0;
            // On-path node survives the removal only with cnt >= k + 1.
            for (char ch : w) {
                cur = children[cur * 26 + (ch - 'a')];
                stamp[cur] = tag;
                if (cnt[cur] >= k + 1 && depth[cur] > big) {
                    big = depth[cur];
                }
            }
            int fb = 0;
            // Deepest off-path depth: top2 exists there, or top1 is off the path.
            for (int d : depths) {
                if (top2[d] != -1) {
                    fb = d;
                    break;
                }
                if (stamp[top1[d]] != tag) {
                    fb = d;
                    break;
                }
            }
            ans[wi] = max(big, fb);
        }
        return ans;
    }
};
