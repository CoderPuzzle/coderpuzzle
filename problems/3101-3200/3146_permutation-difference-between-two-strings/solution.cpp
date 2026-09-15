class Solution {
  public:
    int findPermutationDifference(string s, string t) {
        // Every character occurs exactly once in each string, so its
        // share of the sum is fixed by the two positions alone: one pass
        // records where each letter sits in s, and one pass over t
        // reduces every term to a lookup plus an absolute difference.
        array<int, 26> pos{};
        for (int i = 0; i < (int)s.size(); ++i) {
            pos[s[i] - 'a'] = i;
        }
        int total = 0;
        for (int i = 0; i < (int)t.size(); ++i) {
            total += abs(i - pos[t[i] - 'a']);
        }
        return total;
    }
};
