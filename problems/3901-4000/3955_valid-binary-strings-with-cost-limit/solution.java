import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] generateValidStrings(int n, int k) {
        // Left-to-right backtracking. At index i a '0' is always allowed; a
        // '1' is allowed only when it does not follow another '1' and its
        // index i keeps the running cost <= k. Trying '0' before '1' emits
        // every valid string in lexicographic order. Recursion depth <= 12.
        List<String> out = new ArrayList<>();
        char[] chars = new char[n];
        build(n, k, out, chars, 0, false, 0);
        return out.toArray(new String[0]);
    }

    private void build(int n, int k, List<String> out, char[] chars, int index, boolean prevOne, int cost) {
        if (index == n) {
            out.add(new String(chars));
            return;
        }
        chars[index] = '0';
        build(n, k, out, chars, index + 1, false, cost);
        if (!prevOne && cost + index <= k) {
            chars[index] = '1';
            build(n, k, out, chars, index + 1, true, cost + index);
        }
    }
}
