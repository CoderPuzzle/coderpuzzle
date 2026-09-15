import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int[] powerfulIntegers(int x, int y, int bound) {
        // Walk the x-ladder 1, x, x^2, ... while x^i <= bound. Every
        // y-power is at least 1, so once x^i exceeds bound no sum it
        // heads can stay legal and the walk may stop there.
        Set<Integer> seen = new HashSet<>();
        int xi = 1;
        while (xi <= bound) {
            // For this x-power, walk the y-ladder while the sum stays
            // within bound. A base of 1 freezes its ladder at 1 — cap
            // the exponent right there, or the walk never advances.
            int yj = 1;
            while (xi + yj <= bound) {
                seen.add(xi + yj);
                if (y == 1) break;
                yj *= y;
            }
            // The same cap on the x-ladder itself.
            if (x == 1) break;
            xi *= x;
        }
        // The set already holds every distinct legal sum; sorting
        // states the pinned ascending order in code.
        List<Integer> ordered = new ArrayList<>(seen);
        ordered.sort(null);
        int[] out = new int[ordered.size()];
        for (int i = 0; i < out.length; i++) out[i] = ordered.get(i);
        return out;
    }
}
