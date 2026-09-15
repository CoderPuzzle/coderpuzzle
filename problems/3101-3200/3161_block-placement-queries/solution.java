import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

class Solution {

    private static class SegTree {

        private final int[] mx, tag;
        private final int span;

        SegTree(int span) {
            this.span = span;
            this.mx = new int[4 * span];
            this.tag = new int[4 * span];
            build(1, 0, span - 1);
        }

        private void build(int node, int lo, int hi) {
            if (lo == hi) {
                // No obstacle yet: read the run as reaching past span,
                // which stays above any achievable sz without inventing
                // blockage.
                mx[node] = span - lo;
                return;
            }
            int mid = (lo + hi) / 2;
            build(node * 2, lo, mid);
            build(node * 2 + 1, mid + 1, hi);
            mx[node] = Math.max(mx[node * 2], mx[node * 2 + 1]);
        }

        // The run t - i shrinks as i grows, so the gap's best sits left.
        private void apply(int node, int lo, int t) {
            tag[node] = t;
            mx[node] = t - lo;
        }

        private void push(int node, int lo, int mid) {
            if (tag[node] != 0) {
                apply(node * 2, lo, tag[node]);
                apply(node * 2 + 1, mid + 1, tag[node]);
                tag[node] = 0;
            }
        }

        void assignRange(int ql, int qr, int t) {
            assign(1, 0, span - 1, ql, qr, t);
        }

        private void assign(int node, int nl, int nr, int ql, int qr, int t) {
            if (qr < nl || nr < ql) {
                return;
            }
            if (ql <= nl && nr <= qr) {
                apply(node, nl, t);
                return;
            }
            int mid = (nl + nr) / 2;
            push(node, nl, mid);
            assign(node * 2, nl, mid, ql, qr, t);
            assign(node * 2 + 1, mid + 1, nr, ql, qr, t);
            mx[node] = Math.max(mx[node * 2], mx[node * 2 + 1]);
        }

        int maxRun(int ql, int qr) {
            return runMax(1, 0, span - 1, ql, qr);
        }

        private int runMax(int node, int nl, int nr, int ql, int qr) {
            if (qr < nl || nr < ql) {
                return 0;
            }
            if (ql <= nl && nr <= qr) {
                return mx[node];
            }
            int mid = (nl + nr) / 2;
            push(node, nl, mid);
            return Math.max(runMax(node * 2, nl, mid, ql, qr), runMax(node * 2 + 1, mid + 1, nr, ql, qr));
        }
    }

    public boolean[] getResults(int[][] queries) {
        // d[i] is the free run at start i: the distance from i to the first
        // obstacle strictly after it. A block of size sz can be laid down at
        // start i exactly when d[i] >= sz -- an obstacle may be touched at
        // either end, so only one strictly inside the block forbids it.
        // Placing an obstacle at t rewrites that affine run across the gap it
        // splits; each type-2 query asks whether the best run among starts
        // [0, x - sz] reaches sz.
        int span = 1;
        int typeTwo = 0;
        Set<Integer> candSet = new TreeSet<>();
        for (int[] q : queries) {
            if (q[0] == 2) {
                span = Math.max(span, q[1]);
                typeTwo++;
            } else {
                candSet.add(q[1]);
            }
        }
        List<Integer> candList = new ArrayList<>(candSet);
        int k = candList.size();
        boolean[] result = new boolean[typeTwo];
        SegTree tree = new SegTree(span);
        int[] fen = new int[k + 1];
        int seen = 0;
        for (int[] q : queries) {
            if (q[0] == 1) {
                int t = q[1];
                // Binary search the sorted candidates for t's rank (1-based).
                int at = Collections.binarySearch(candList, t);
                if (at < 0) {
                    at = -at - 1;
                }
                int rank = at + 1;
                int below = 0;
                for (int i = rank - 1; i > 0; i -= i & -i) {
                    below += fen[i];
                }
                // Largest marked rank at or below rank - 1 gives the
                // previously placed obstacle.
                int previous = -1;
                if (below > 0) {
                    int pos = 0;
                    int remaining = below;
                    for (int step = Integer.highestOneBit(Math.max(k, 1)); step > 0; step >>= 1) {
                        int next = pos + step;
                        if (next <= k && fen[next] < remaining) {
                            remaining -= fen[next];
                            pos = next;
                        }
                    }
                    previous = candList.get(pos);
                }
                for (int i = rank; i <= k; i += i & -i) {
                    fen[i]++;
                }
                int lo = Math.max(previous, 0);
                int hi = Math.min(t - 1, span - 1);
                // Everything right of t keeps its old nearest obstacle.
                if (lo <= hi) {
                    tree.assignRange(lo, hi, t);
                }
            } else {
                int x = q[1];
                int sz = q[2];
                int startHi = x - sz;
                int best = startHi >= 0 ? tree.maxRun(0, startHi) : 0;
                result[seen++] = best >= sz;
            }
        }
        return result;
    }
}
