class Solution {
  public:
    vector<int> findPermutation(string s) {
        // Ascending 1..n+1 is the lexicographically smallest arrangement of
        // the values, and it already satisfies every 'I' — so disturb it only
        // where a maximal run of 'D's demands a descent, by reversing exactly
        // the block that run covers.
        int n = s.size();
        vector<int> perm;
        perm.reserve(n + 1);
        for (int i = 0; i <= n; ++i) {
            perm.push_back(i + 1);
        }
        int i = 0;
        while (i < n) {
            if (s[i] == 'D') {
                int start = i;
                while (i < n && s[i] == 'D') {
                    ++i;
                }
                for (int lo = start, hi = i; lo < hi; ++lo, --hi) {
                    swap(perm[lo], perm[hi]);
                }
            } else {
                ++i;
            }
        }
        return perm;
    }
};
