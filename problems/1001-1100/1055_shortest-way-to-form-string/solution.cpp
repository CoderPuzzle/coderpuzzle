class Solution {
  public:
    int shortestWay(string source, string target) {
        int n = (int)source.size(), m = (int)target.size();
        int j = 0;
        int count = 0;
        while (j < m) {
            // One pass through source: greedily consume as much of the
            // remaining target as a subsequence match allows.
            int start = j;
            for (int i = 0; i < n; i++) {
                if (j < m && source[i] == target[j])
                    j++;
            }
            // A pass that matched nothing means target[j] never occurs in
            // source at all, so target can never be finished.
            if (j == start)
                return -1;
            count++;
        }
        return count;
    }
};
