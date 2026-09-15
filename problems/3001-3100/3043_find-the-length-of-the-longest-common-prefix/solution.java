import java.util.HashSet;
import java.util.Set;

class Solution {

    public int longestCommonPrefix(int[] arr1, int[] arr2) {
        // A shared prefix of length L means the first L decimal digits agree,
        // so collect every decimal prefix of arr1 into a set.
        Set<Integer> prefixes = new HashSet<>();
        for (int x : arr1) {
            int v = 0;
            // Fold digits left to right; each intermediate v is one prefix of x.
            for (char ch : Integer.toString(x).toCharArray()) {
                v = v * 10 + (ch - '0');
                prefixes.add(v);
            }
        }
        int best = 0;
        for (int y : arr2) {
            char[] s = Integer.toString(y).toCharArray();
            int v = 0;
            for (int i = 0; i < s.length; i++) {
                v = v * 10 + (s[i] - '0');
                if (prefixes.contains(v)) {
                    if (i + 1 > best) best = i + 1;
                } else {
                    // Prefixes nest: once one length of y misses, no longer
                    // prefix of y can match either.
                    break;
                }
            }
        }
        return best;
    }
}
