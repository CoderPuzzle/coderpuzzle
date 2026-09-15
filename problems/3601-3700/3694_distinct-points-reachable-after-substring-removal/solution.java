import java.util.HashSet;
import java.util.Set;

class Solution {

    public int distinctPoints(String s, int k) {
        int n = s.length();
        // Moves add like vectors, so the endpoint left after deleting a
        // window is the full-walk endpoint minus the window's own
        // displacement — only window sums matter, never the re-walk.
        int tx = 0,
            ty = 0;
        for (int i = 0; i < n; i++) {
            tx += dx(s.charAt(i));
            ty += dy(s.charAt(i));
        }
        // Slide the length-k window, updating its displacement in O(1) per
        // step — drop the outgoing move, pick up the incoming one — and
        // collect the endpoint every deletion produces.
        int wx = 0,
            wy = 0;
        for (int i = 0; i < k; i++) {
            wx += dx(s.charAt(i));
            wy += dy(s.charAt(i));
        }
        Set<Long> seen = new HashSet<>();
        for (int i = 0; i + k <= n; i++) {
            // Both components lie in [-n, n]; shifting them positive packs
            // the pair into one injective 64-bit key.
            seen.add(((long) (tx - wx + n) << 32) | (ty - wy + n));
            if (i + k < n) {
                wx += dx(s.charAt(i + k)) - dx(s.charAt(i));
                wy += dy(s.charAt(i + k)) - dy(s.charAt(i));
            }
        }
        return seen.size();
    }

    private int dx(char c) {
        return c == 'L' ? -1 : c == 'R' ? 1 : 0;
    }

    private int dy(char c) {
        return c == 'D' ? -1 : c == 'U' ? 1 : 0;
    }
}
