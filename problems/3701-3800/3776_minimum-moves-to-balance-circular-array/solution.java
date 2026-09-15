import java.util.Arrays;

class Solution {

    public long minMoves(int[] balance) {
        // At most one person is negative. With none, nobody moves; with a
        // negative total, no arrangement can work. Otherwise every unit a
        // giver releases costs one move per hop of its circular distance
        // to the negative index, so draining the deficit from the nearest
        // givers first — cheapest distance, then the next, and so on —
        // totals the minimum. Moves reach ~1e14, hence long.
        int n = balance.length;
        int neg = -1;
        for (int i = 0; i < n; i++) {
            if (balance[i] < 0) {
                neg = i;
                break;
            }
        }
        if (neg == -1) {
            return 0L;
        }
        long total = 0;
        for (int v : balance) {
            total += v;
        }
        if (total < 0) {
            return -1L;
        }
        long[][] supplies = new long[n][2];
        int m = 0;
        for (int i = 0; i < n; i++) {
            if (i != neg && balance[i] > 0) {
                int cw = (i - neg + n) % n;
                int ccw = (neg - i + n) % n;
                supplies[m][0] = Math.min(cw, ccw);
                supplies[m][1] = balance[i];
                m++;
            }
        }
        Arrays.sort(supplies, 0, m, (a, b) -> Long.compare(a[0], b[0]));
        long need = -((long) balance[neg]);
        long moves = 0;
        for (int i = 0; i < m && need > 0; i++) {
            long take = Math.min(supplies[i][1], need);
            moves += take * supplies[i][0];
            need -= take;
        }
        return moves;
    }
}
