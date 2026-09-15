import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int buildWall(int height, int width, int[] bricks) {
        // A row is fully described by its internal-joint bitmask; adjacent
        // rows must be disjoint. Enumerate row masks once, then run one
        // map-of-counts transition per row.
        final long MOD = 1_000_000_007L;
        List<Integer> masks = new ArrayList<>();
        buildRows(0, width, bricks, 0, masks);
        if (masks.isEmpty()) {
            return 0;
        }
        Map<Integer, Long> counts = new HashMap<>();
        for (int mask : masks) {
            counts.put(mask, 1L);
        }
        for (int row = 1; row < height; ++row) {
            Map<Integer, Long> nextCounts = new HashMap<>();
            for (int below : masks) {
                long total = 0;
                for (int above : masks) {
                    if ((above & below) == 0) {
                        total += counts.get(above);
                    }
                }
                nextCounts.put(below, total % MOD);
            }
            counts = nextCounts;
        }
        long answer = 0;
        for (long value : counts.values()) {
            answer = (answer + value) % MOD;
        }
        return (int) answer;
    }

    private void buildRows(int position, int width, int[] bricks, int mask, List<Integer> masks) {
        if (position == width) {
            masks.add(mask);
            return;
        }
        for (int brick : bricks) {
            if (position + brick > width) {
                continue;
            }
            int next = position + brick;
            int extra = next < width ? 1 << (next - 1) : 0;
            buildRows(next, width, bricks, mask | extra, masks);
        }
    }
}
