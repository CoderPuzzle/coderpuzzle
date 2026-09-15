class Solution {
  public:
    int numberOfSubstrings(string s) {
        // last occurrence of a/b/c so far; -1 = letter not seen yet
        int last[3] = {-1, -1, -1};
        long long count = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            int idx = s[i] - 'a';
            if (idx >= 0 && idx <= 2) {
                last[idx] = i;
            }
            // substring s[l..i] is valid iff l <= min(last): every such left
            // endpoint yields one valid substring ending at i (0 until all seen)
            count += min({last[0], last[1], last[2]}) + 1;
        }
        return (int)count;
    }
};
