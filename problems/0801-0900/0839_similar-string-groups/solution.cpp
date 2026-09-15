class Solution {
  public:
    int numSimilarGroups(vector<string> &strs) {
        int n = strs.size();
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);

        // Path halving keeps repeated lookups nearly constant.
        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };

        // All words are mutual anagrams, so they are similar iff they
        // differ in 0 or 2 positions — exactly what one swap fixes;
        // bail on the third mismatch.
        auto similar = [&](const string &a, const string &b) {
            int mismatches = 0;
            for (size_t i = 0; i < a.size(); i++) {
                if (a[i] != b[i]) {
                    mismatches++;
                    if (mismatches > 2) {
                        return false;
                    }
                }
            }
            return mismatches == 0 || mismatches == 2;
        };

        // Union every similar pair: groups are the transitive closure,
        // so indirectly similar words share a root.
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (similar(strs[i], strs[j])) {
                    int ri = find(i);
                    int rj = find(j);
                    if (ri != rj) {
                        parent[ri] = rj;
                    }
                }
            }
        }

        // The answer is the number of distinct roots remaining.
        unordered_set<int> roots;
        for (int i = 0; i < n; i++) {
            roots.insert(find(i));
        }
        return roots.size();
    }
};
