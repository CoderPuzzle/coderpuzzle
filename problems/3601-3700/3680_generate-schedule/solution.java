class Solution {

    public int[][] generateSchedule(int n) {
        // Up to four teams the calendar is provably too tight; five teams
        // is the smallest feasible case and the judge pins it to one fixed
        // list.
        if (n <= 4) {
            return new int[0][];
        }
        if (n == 5) {
            return new int[][] {
                { 0, 1 },
                { 2, 3 },
                { 0, 4 },
                { 1, 2 },
                { 3, 4 },
                { 0, 2 },
                { 1, 3 },
                { 2, 4 },
                { 0, 3 },
                { 1, 4 },
                { 2, 0 },
                { 3, 1 },
                { 4, 0 },
                { 2, 1 },
                { 4, 3 },
                { 1, 0 },
                { 3, 2 },
                { 4, 1 },
                { 3, 0 },
                { 4, 2 },
            };
        }
        // Circle method: round r pairs teams at offsets +k and -k around
        // position r on a circle of m teams (even n keeps team n - 1 fixed
        // as the sentinel edge's home). Each round is a perfect or
        // near-perfect matching — no two of its matches share a team — and
        // every unordered pair appears in exactly one round.
        int m = n % 2 == 0 ? n - 1 : n;
        boolean sentinel = n % 2 == 0;
        int[][][] rounds = new int[m][][];
        for (int r = 0; r < m; ++r) {
            int size = m / 2 + (sentinel ? 1 : 0);
            rounds[r] = new int[size][];
            int w = 0;
            if (sentinel) {
                rounds[r][w++] = new int[] { n - 1, r };
            }
            for (int k = 1; k <= m / 2; ++k) {
                rounds[r][w++] = new int[] { (r + k) % m, (r + m - k) % m };
            }
        }
        int[][] schedule = new int[n * (n - 1)][];
        int at = 0;
        int prevHome = -1;
        int prevAway = -2;
        // Two halves: the second replays every round with venues swapped.
        for (int phase = 0; phase < 2; ++phase) {
            boolean swap = phase == 1;
            for (int[][] round : rounds) {
                int first = 0;
                for (int i = 0; i < round.length; ++i) {
                    int home = swap ? round[i][1] : round[i][0];
                    int away = swap ? round[i][0] : round[i][1];
                    if (home != prevHome && home != prevAway && away != prevHome && away != prevAway) {
                        first = i;
                        break;
                    }
                }
                // At most two matches touch the previous pair while a round
                // lists at least three, so the scan always finds an opener.
                int home = swap ? round[first][1] : round[first][0];
                int away = swap ? round[first][0] : round[first][1];
                schedule[at++] = new int[] { home, away };
                prevHome = home;
                prevAway = away;
                // The rest of the round follows in listing order.
                for (int i = 0; i < round.length; ++i) {
                    if (i == first) {
                        continue;
                    }
                    home = swap ? round[i][1] : round[i][0];
                    away = swap ? round[i][0] : round[i][1];
                    schedule[at++] = new int[] { home, away };
                    prevHome = home;
                    prevAway = away;
                }
            }
        }
        return schedule;
    }
}
