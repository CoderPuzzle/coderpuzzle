import java.util.Arrays;

class Solution {

    public int maxWalls(int[] robots, int[] distance, int[] walls) {
        // Sort robots by position (carrying each range along) and sort the
        // wall positions once: every reachable set below is then counted
        // with two binary searches instead of a scan.
        int n = robots.length;
        int[][] bots = new int[n][2];
        for (int i = 0; i < n; i++) {
            bots[i][0] = robots[i];
            bots[i][1] = distance[i];
        }
        Arrays.sort(bots, (a, b) -> Integer.compare(a[0], b[0]));
        Arrays.sort(walls);
        // Interval ends reach 1e9 + 1e5 — inside int, but the arithmetic
        // below runs in long so nothing depends on that headroom.
        // prev_left / prev_right: best totals for the robots already decided
        // when the last of them fired left / right.
        long prevLeft = count(walls, leftLo(bots, 0), bots[0][0]);
        long prevRight = count(walls, bots[0][0], rightHi(bots, 0));
        for (int i = 1; i < n; i++) {
            long pos = bots[i][0];
            long hereLeft = count(walls, leftLo(bots, i), pos);
            long hereRight = count(walls, pos, rightHi(bots, i));
            // Facing shots share the gap: when this robot fires left and the
            // previous one fired right, the walls both bullets reach were
            // already counted and must not count twice.
            long shared = count(walls, leftLo(bots, i), Math.min((long) bots[i - 1][0] + bots[i - 1][1], pos - 1));
            long best = Math.max(prevLeft, prevRight);
            prevLeft = Math.max(prevLeft + hereLeft, prevRight + hereLeft - shared);
            // A rightward shot can never overlap anything already decided.
            prevRight = best + hereRight;
        }
        return (int) Math.max(prevLeft, prevRight);
    }

    private long count(int[] walls, long lo, long hi) {
        // How many walls lie in the closed interval [lo, hi].
        if (lo > hi) {
            return 0;
        }
        return lowerBound(walls, hi + 1) - lowerBound(walls, lo);
    }

    private int lowerBound(int[] walls, long value) {
        // First index whose wall is >= value.
        int lo = 0,
            hi = walls.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (walls[mid] < value) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // Firing left the bullet stops at the previous robot; a wall on the
    // blocker's position survives (only the blocker itself can destroy it).
    private long leftLo(int[][] bots, int i) {
        long lo = (long) bots[i][0] - bots[i][1];
        if (i > 0) {
            lo = Math.max(lo, (long) bots[i - 1][0] + 1);
        }
        return lo;
    }

    // Firing right the bullet stops at the next robot.
    private long rightHi(int[][] bots, int i) {
        long hi = (long) bots[i][0] + bots[i][1];
        if (i + 1 < bots.length) {
            hi = Math.min(hi, (long) bots[i + 1][0] - 1);
        }
        return hi;
    }
}
