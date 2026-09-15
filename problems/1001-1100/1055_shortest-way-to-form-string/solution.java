class Solution {

    public int shortestWay(String source, String target) {
        int n = source.length(),
            m = target.length();
        int j = 0;
        int count = 0;
        while (j < m) {
            // One pass through source: greedily consume as much of the
            // remaining target as a subsequence match allows.
            int start = j;
            for (int i = 0; i < n; i++) {
                if (j < m && source.charAt(i) == target.charAt(j)) j++;
            }
            // A pass that matched nothing means target[j] never occurs in
            // source at all, so target can never be finished.
            if (j == start) return -1;
            count++;
        }
        return count;
    }
}
