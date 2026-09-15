import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] beautifulIndices(String s, String a, String b, int k) {
        List<Integer> inA = occurrences(a, s);
        List<Integer> inB = occurrences(b, s);
        List<Integer> matched = new ArrayList<>();
        // Both lists ascend and i - k grows along inA, so the first
        // b-occurrence at or after i - k only moves forward: one merge-style
        // pass tests each window [i - k, i + k] in amortized constant time.
        int low = 0;
        for (int i : inA) {
            while (low < inB.size() && inB.get(low) < i - k) low++;
            if (low < inB.size() && inB.get(low) <= i + k) matched.add(i);
        }
        int[] result = new int[matched.size()];
        for (int i = 0; i < result.length; i++) result[i] = matched.get(i);
        return result;
    }

    private List<Integer> occurrences(String pattern, String text) {
        int m = pattern.length();
        // KMP failure function: pi[i] is the length of the longest proper
        // prefix of pattern[0..i] that is also its suffix.
        int[] pi = new int[m];
        int state = 0;
        for (int i = 1; i < m; i++) {
            while (state > 0 && pattern.charAt(i) != pattern.charAt(state)) state = pi[state - 1];
            if (pattern.charAt(i) == pattern.charAt(state)) state++;
            pi[i] = state;
        }
        // One scan of text; on a full match the failure function keeps the
        // scan going instead of restarting, so periodic texts stay linear.
        List<Integer> starts = new ArrayList<>();
        state = 0;
        for (int i = 0; i < text.length(); i++) {
            char c = text.charAt(i);
            while (state > 0 && c != pattern.charAt(state)) state = pi[state - 1];
            if (c == pattern.charAt(state)) state++;
            if (state == m) {
                starts.add(i - m + 1);
                state = pi[state - 1];
            }
        }
        return starts;
    }
}
