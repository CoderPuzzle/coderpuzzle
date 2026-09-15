class Solution {
  public:
    vector<int> stringIndices(vector<string> &wordsContainer, vector<string> &wordsQuery) {
        int m = wordsContainer.size();
        vector<int> lens(m);
        for (int i = 0; i < m; i++) {
            lens[i] = (int)wordsContainer[i].size();
        }
        // Tie-break: shorter word wins, then the smaller index.
        auto better = [&](int a, int b) {
            if (b == -1)
                return true;
            if (lens[a] != lens[b])
                return lens[a] < lens[b];
            return a < b;
        };

        // Trie over reversed words; node 0 is the root (empty suffix).
        vector<unordered_map<char, int>> children(1);
        vector<int> best(1, -1);

        // Insert each word backwards, annotating every visited node, root included.
        for (int i = 0; i < m; i++) {
            const string &word = wordsContainer[i];
            int node = 0;
            if (better(i, best[node]))
                best[node] = i;
            for (int j = (int)word.size() - 1; j >= 0; j--) {
                char ch = word[j];
                auto it = children[node].find(ch);
                int nxt;
                if (it == children[node].end()) {
                    nxt = (int)children.size();
                    children.push_back(unordered_map<char, int>());
                    best.push_back(-1);
                    children[node][ch] = nxt;
                } else {
                    nxt = it->second;
                }
                node = nxt;
                if (better(i, best[node]))
                    best[node] = i;
            }
        }

        vector<int> ans;
        ans.reserve(wordsQuery.size());
        // Walk the reversed query as deep as the trie allows; deepest node's best wins.
        for (const string &word : wordsQuery) {
            int node = 0;
            // Root's best answers the empty-suffix case (no child matched).
            int res = best[0];
            for (int j = (int)word.size() - 1; j >= 0; j--) {
                auto it = children[node].find(word[j]);
                if (it == children[node].end())
                    break;
                node = it->second;
                res = best[node];
            }
            ans.push_back(res);
        }
        return ans;
    }
};
