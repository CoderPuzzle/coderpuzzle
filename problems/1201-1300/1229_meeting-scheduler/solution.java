import java.util.Arrays;

class Solution {

    public long[] minAvailableDuration(long[][] slots1, long[][] slots2, int duration) {
        long[][] a = sortedByStart(slots1);
        long[][] b = sortedByStart(slots2);
        int i = 0,
            j = 0;
        while (i < a.length && j < b.length) {
            long start = Math.max(a[i][0], b[j][0]);
            long end = Math.min(a[i][1], b[j][1]);
            if (end - start >= duration) return new long[] { start, start + duration };
            // The earlier-ending slot cannot overlap any later slot of the
            // other person, so only that pointer advances.
            if (a[i][1] < b[j][1]) ++i;
            else ++j;
        }
        return new long[] {};
    }

    private long[][] sortedByStart(long[][] slots) {
        long[][] out = slots.clone();
        Arrays.sort(out, (x, y) -> Long.compare(x[0], y[0]));
        return out;
    }
}
