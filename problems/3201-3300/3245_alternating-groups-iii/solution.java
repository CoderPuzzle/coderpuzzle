class Solution {

    private static class Fenwick {

        private final int n;
        private final int[] bit;

        Fenwick(int n) {
            this.n = n;
            this.bit = new int[n + 1];
        }

        void add(int i, int delta) {
            i += 1;
            while (i <= n) {
                bit[i] += delta;
                i += i & -i;
            }
        }

        int prefix(int i) {
            i += 1;
            int total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & -i;
            }
            return total;
        }
    }

    public int[] numberOfAlternatingGroups(int[] colors, int[][] queries) {
        // Edge j joins tile j and tile j + 1 circularly and is bad when its two
        // endpoints share a color. A size-k group starting at tile s spans the
        // k - 1 consecutive edges s..s+k-2, so counting size-k groups means
        // counting starting edges followed by k - 1 good edges. Keep the bad
        // edges in an ordered set and the multiset of good-edge runs between
        // neighboring bad edges in two Fenwick trees keyed by run length (one
        // counting runs, one summing lengths); a repaint toggles exactly two
        // edges, each splitting or merging a single run, and with no bad edge
        // left every one of the n starts works.
        int n = colors.length;
        boolean[] bad = new boolean[n];
        java.util.TreeSet<Integer> bads = new java.util.TreeSet<>();
        Fenwick fenCnt = new Fenwick(n);
        Fenwick fenSum = new Fenwick(n);
        int[] totals = new int[2]; // count of stored runs, sum of their lengths
        for (int j = 0; j < n; j++) {
            bad[j] = colors[j] == colors[(j + 1) % n];
            if (bad[j]) insertEdge(bads, fenCnt, fenSum, totals, n, j);
        }
        java.util.ArrayList<Integer> resultList = new java.util.ArrayList<>();
        for (int[] query : queries) {
            if (query[0] == 1) {
                if (bads.isEmpty()) {
                    resultList.add(n);
                    continue;
                }
                int need = query[1] - 1;
                int cntGe = totals[0] - fenCnt.prefix(need - 1);
                int sumGe = totals[1] - fenSum.prefix(need - 1);
                resultList.add(sumGe - (need - 1) * cntGe);
            } else {
                int index = query[1],
                    color = query[2];
                if (colors[index] == color) continue;
                colors[index] = color;
                int[] touched = { (index + n - 1) % n, index };
                for (int e : touched) {
                    boolean isBad = colors[e] == colors[(e + 1) % n];
                    if (isBad == bad[e]) continue;
                    bad[e] = isBad;
                    if (isBad) {
                        insertEdge(bads, fenCnt, fenSum, totals, n, e);
                    } else {
                        removeEdge(bads, fenCnt, fenSum, totals, n, e);
                    }
                }
            }
        }
        int[] answer = new int[resultList.size()];
        for (int i = 0; i < answer.length; i++) {
            answer[i] = resultList.get(i);
        }
        return answer;
    }

    private static void insertEdge(
        java.util.TreeSet<Integer> bads,
        Fenwick fenCnt,
        Fenwick fenSum,
        int[] totals,
        int n,
        int e
    ) {
        if (!bads.isEmpty()) {
            int p = prevBad(bads, e),
                nx = nextBad(bads, e);
            runsUpdate(fenCnt, fenSum, totals, n, mod(nx - p - 1, n), -1);
            runsUpdate(fenCnt, fenSum, totals, n, mod(e - p - 1, n), 1);
            runsUpdate(fenCnt, fenSum, totals, n, mod(nx - e - 1, n), 1);
        }
        bads.add(e);
        if (bads.size() == 1) {
            runsUpdate(fenCnt, fenSum, totals, n, n - 1, 1);
        }
    }

    private static void removeEdge(
        java.util.TreeSet<Integer> bads,
        Fenwick fenCnt,
        Fenwick fenSum,
        int[] totals,
        int n,
        int e
    ) {
        bads.remove(e);
        if (!bads.isEmpty()) {
            int p = prevBad(bads, e),
                nx = nextBad(bads, e);
            runsUpdate(fenCnt, fenSum, totals, n, mod(e - p - 1, n), -1);
            runsUpdate(fenCnt, fenSum, totals, n, mod(nx - e - 1, n), -1);
            runsUpdate(fenCnt, fenSum, totals, n, mod(nx - p - 1, n), 1);
        } else {
            runsUpdate(fenCnt, fenSum, totals, n, n - 1, -1);
        }
    }

    private static int prevBad(java.util.TreeSet<Integer> bads, int e) {
        Integer p = bads.lower(e);
        return p == null ? bads.last() : p;
    }

    private static int nextBad(java.util.TreeSet<Integer> bads, int e) {
        Integer nx = bads.higher(e);
        return nx == null ? bads.first() : nx;
    }

    private static int mod(int d, int n) {
        return ((d % n) + n) % n;
    }

    private static void runsUpdate(Fenwick fenCnt, Fenwick fenSum, int[] totals, int n, int length, int delta) {
        if (length > 0) {
            fenCnt.add(length, delta);
            fenSum.add(length, delta * length);
            totals[0] += delta;
            totals[1] += delta * length;
        }
    }
}
