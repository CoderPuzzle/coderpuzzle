class Solution {
  public:
    vector<int> longestCommonPrefix(vector<string> &words) {
        // Removing words[i] keeps every adjacent pair except (i-1, i) and
        // (i, i+1), and adds the single new pair (i-1, i+1). With
        // adj[j] = lcp(words[j], words[j+1]), the best surviving old pair
        // is the max of adj[0..i-2] and adj[i+1..n-2] — pre/suffix maxima
        // answer that in O(1) — so each answer is the max of the left
        // max, the right max, and that one new LCP.
        int n = (int)words.size();
        auto lcp = [](const string &a, const string &b) {
            int limit = min((int)a.size(), (int)b.size());
            int j = 0;
            while (j < limit && a[j] == b[j])
                ++j;
            return j;
        };
        vector<int> adj(max(n - 1, 0));
        for (int i = 0; i + 1 < n; ++i)
            adj[i] = lcp(words[i], words[i + 1]);

        vector<int> pre(n, 0); // max(adj[0..i-2]) — best pair fully left of i
        for (int i = 2; i < n; ++i)
            pre[i] = max(pre[i - 1], adj[i - 2]);
        vector<int> suf(n, 0); // max(adj[i+1..n-2]) — best pair fully right of i
        for (int i = n - 3; i >= 0; --i)
            suf[i] = max(suf[i + 1], adj[i + 1]);

        vector<int> answer(n, 0);
        for (int i = 0; i < n; ++i) {
            int best = max(pre[i], suf[i]);
            if (i > 0 && i < n - 1)
                best = max(best, lcp(words[i - 1], words[i + 1]));
            answer[i] = best;
        }
        return answer;
    }
};
