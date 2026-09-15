class Solution {

    public int findPattern(InfiniteStream stream, int[] pattern) {
        int m = pattern.length;
        // Failure function: fail[i] is the length of the longest proper
        // prefix of pattern[0..i] that is also its suffix.
        int[] fail = new int[m];
        for (int i = 1, k = 0; i < m; i++) {
            while (k > 0 && pattern[i] != pattern[k]) {
                k = fail[k - 1];
            }
            if (pattern[i] == pattern[k]) {
                k++;
            }
            fail[i] = k;
        }
        // Consume the stream through the KMP automaton: `matched` is the
        // longest pattern prefix ending at the bit just read.
        int matched = 0;
        int read = 0;
        while (true) {
            int bit = stream.next();
            read++;
            while (matched > 0 && bit != pattern[matched]) {
                matched = fail[matched - 1];
            }
            if (bit == pattern[matched]) {
                matched++;
            }
            if (matched == m) {
                return read - m;
            }
        }
    }
}
