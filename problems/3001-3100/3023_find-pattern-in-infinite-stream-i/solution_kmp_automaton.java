class Solution {

    public int findPattern(InfiniteStream stream, int[] pattern) {
        int length = pattern.length;
        // KMP failure function, built from the pattern alone: fail[k] is the
        // length of the longest proper prefix of the pattern that is also a
        // suffix of its first k bits.
        int[] fail = new int[length + 1];
        int matched = 0;
        for (int i = 1; i < length; i++) {
            while (matched > 0 && pattern[i] != pattern[matched]) {
                matched = fail[matched];
            }
            if (pattern[i] == pattern[matched]) {
                matched++;
            }
            fail[i + 1] = matched;
        }
        // Stream the bits through the automaton: the state counts the pattern
        // bits matched so far. Each arriving bit either extends the state or
        // falls it back along the failure links, so no bit is ever needed
        // twice -- the state reaching `length` means the match just ended at
        // `read`, and its start is read - length.
        int state = 0;
        int read = 0;
        while (true) {
            int bit = stream.next();
            read++;
            while (state > 0 && pattern[state] != bit) {
                state = fail[state];
            }
            if (pattern[state] == bit) {
                state++;
            }
            if (state == length) {
                return read - length;
            }
        }
    }
}
