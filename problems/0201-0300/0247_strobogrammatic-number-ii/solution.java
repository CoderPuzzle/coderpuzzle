import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public String[] findStrobogrammatic(int n) {
        // A strobogrammatic number of length n is one wrapping pair around
        // one of length n - 2, so the recursion shrinks by 2 per level —
        // down to an empty core (even n) or one self-rotating digit (odd n).
        List<String> results = build(n, true);
        return results.toArray(new String[0]);
    }

    private List<String> build(int length, boolean outer) {
        if (length == 0) {
            return new ArrayList<>(Arrays.asList(""));
        }
        if (length == 1) {
            return new ArrayList<>(Arrays.asList("0", "1", "8"));
        }
        // "00" would put a leading zero on the whole number, so it may
        // wrap only inner layers, never the outermost.
        String[] pairs = outer
            ? new String[] { "11", "69", "88", "96" }
            : new String[] { "00", "11", "69", "88", "96" };
        List<String> inners = build(length - 2, false);
        List<String> results = new ArrayList<>();
        // Pairs ascend by their left digit and every wrapped result has
        // the same length, so each layer emits its list in ascending
        // lexicographic order already — no final sort needed.
        for (String pair : pairs) {
            for (String inner : inners) {
                results.add(pair.charAt(0) + inner + pair.charAt(1));
            }
        }
        return results;
    }
}
