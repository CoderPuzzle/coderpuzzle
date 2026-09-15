import java.util.Arrays;

class Solution {

    public String findReplaceString(String s, int[] indices, String[] sources, String[] targets) {
        // Replacements are simultaneous: each match is judged against the
        // original string, so first record every operation that succeeds —
        // sources[i] read from indices[i] — as a map from start position to
        // operation, then walk s once. A position holding a winner emits its
        // target and skips the consumed source; every other character copies
        // through unchanged. The non-overlap guarantee means a skip never
        // lands inside another winner's span.
        int n = s.length();
        int[] match = new int[n];
        Arrays.fill(match, -1);
        for (int op = 0; op < indices.length; op++) {
            if (s.regionMatches(indices[op], sources[op], 0, sources[op].length())) {
                match[indices[op]] = op;
            }
        }
        StringBuilder result = new StringBuilder();
        int i = 0;
        while (i < n) {
            int op = match[i];
            if (op >= 0) {
                result.append(targets[op]);
                i += sources[op].length();
            } else {
                result.append(s.charAt(i));
                i++;
            }
        }
        return result.toString();
    }
}
