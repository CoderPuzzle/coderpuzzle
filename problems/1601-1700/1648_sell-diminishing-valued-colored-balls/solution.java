import java.util.Arrays;
import java.util.Collections;

class Solution {

    public int maxProfit(int[] inventory, int orders) {
        final long MOD = 1_000_000_007L;
        int n0 = inventory.length;
        Integer[] inv = new Integer[n0 + 1];
        for (int i = 0; i < n0; i++) {
            inv[i] = inventory[i];
        }
        inv[n0] = 0; // sentinel
        Arrays.sort(inv, Collections.reverseOrder());

        long total = 0;
        long remaining = orders;
        int i = 0;
        int n = inv.length;
        while (remaining > 0 && i < n - 1) {
            while (i + 1 < n - 1 && inv[i + 1].intValue() == inv[i].intValue()) {
                i += 1;
            }
            long h = inv[i];
            long low = inv[i + 1]; // next distinct level (or 0 sentinel)
            long width = i + 1; // colors currently at level h or above
            long band = width * (h - low); // balls in the full band (low, h]
            if (remaining >= band) {
                // sell every ball valued low+1 .. h for each of the width colors
                total = (total + (width * (h + low + 1) * (h - low)) / 2) % MOD;
                remaining -= band;
                i += 1;
            } else {
                long full = remaining / width;
                long rem = remaining % width;
                long top = h;
                long bottom = h - full + 1;
                total = (total + (width * (top + bottom) * full) / 2) % MOD;
                total = (total + rem * (h - full)) % MOD;
                remaining = 0;
            }
        }
        return (int) total;
    }
}
