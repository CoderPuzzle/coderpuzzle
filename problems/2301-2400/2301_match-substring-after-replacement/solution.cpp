class Solution {
  public:
    bool matchReplacement(string s, string sub, vector<vector<string>> &mappings) {
        // 5120 bits hold every position of s (n <= 5000).
        using Mask = bitset<5120>;
        // base[t] marks every position of s holding character t; matched[old]
        // extends it with the positions each declared target covers, so bit p
        // of matched[old] is exactly matched(old, s[p]).
        vector<Mask> base(128), matched(128);
        for (int p = 0; p < (int)s.size(); ++p) {
            base[s[p]].set(p);
        }
        matched = base;
        for (auto &pair : mappings) {
            matched[pair[0][0]] |= base[pair[1][0]];
        }
        // bit e of seen marks a window whose first j + 1 characters all match
        // and that ends at e. Seed with the first character's mask; every
        // later character grows the survivors one position deeper into s.
        Mask seen = matched[sub[0]];
        for (int j = 1; j < (int)sub.size(); ++j) {
            seen = (seen << 1) & matched[sub[j]];
        }
        return seen.any();
    }
};
