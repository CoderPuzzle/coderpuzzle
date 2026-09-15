import java.util.Arrays;

class Solution {

    public boolean canBeEqual(String s1, String s2) {
        // A legal swap joins indices exactly 2 apart, so it exchanges only
        // the slots {0, 2} or only the slots {1, 3}: no letter can ever
        // cross between the two pairs, and repeating a swap just undoes it.
        // Both strings are therefore stuck reshuffling inside their own two
        // pairs, and they can be made equal exactly when each pair already
        // carries the same two letters in either order — compare unordered.
        for (int a = 0; a <= 1; ++a) {
            char[] p = { s1.charAt(a), s1.charAt(a + 2) };
            char[] q = { s2.charAt(a), s2.charAt(a + 2) };
            Arrays.sort(p);
            Arrays.sort(q);
            if (p[0] != q[0] || p[1] != q[1]) {
                return false;
            }
        }
        return true;
    }
}
