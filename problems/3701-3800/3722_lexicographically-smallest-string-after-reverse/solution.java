class Solution {

    public String lexSmallest(String s) {
        // Reversing a single character changes nothing, so s itself is
        // always one of the reachable strings and seeds the minimum.
        int n = s.length();
        String best = s;
        // Flip the first k characters: the reversed head lands in front of
        // whatever the operation left untouched.
        for (int k = 2; k <= n; k++) {
            best = smaller(best, s, 0, k);
        }
        // Flip the last k characters: the untouched head keeps its order
        // while the reversed tail closes the string.
        for (int k = 2; k <= n; k++) {
            best = smaller(best, s, n - k, n);
        }
        return best;
    }

    // Copies s with the stretch [from, to) reversed and returns whichever
    // of that copy and best comes first in dictionary order.
    private String smaller(String best, String s, int from, int to) {
        char[] letters = s.toCharArray();
        for (int i = from, j = to - 1; i < j; i++, j--) {
            char swap = letters[i];
            letters[i] = letters[j];
            letters[j] = swap;
        }
        String candidate = new String(letters);
        return candidate.compareTo(best) < 0 ? candidate : best;
    }
}
