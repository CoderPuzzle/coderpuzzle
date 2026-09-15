import java.util.Arrays;

class Solution {

    // Per-phase state vectors plus the shared transitions between them.
    private static final long NEG = Long.MIN_VALUE / 4;

    public long maximumScore(int[] nums, int k) {
        // Each subarray contributes a +max and a -min mark, so at most
        // min(k, n // 2) opposite pairs exist; a pair's credit is its plus
        // mark minus its minus mark -- exactly one subarray's range.
        int size = Math.min(k, nums.length / 2) + 1;
        States st = new States(size);

        for (int value : nums) {
            long a = value;
            long pristine = st.closed[0];

            long[] nOp = States.merge(st.op, States.bump(st.closed, size, a));
            long[] nOm = States.merge(st.om, States.bump(st.closed, size, -a));
            long[] nClosed = States.merge(
                States.merge(st.closed, States.shiftAdd(st.op, size, -a)),
                States.shiftAdd(st.om, size, a)
            );

            long[] nWp = st.wp.clone();
            long[] nWm = st.wm.clone();
            nWp[0] = Math.max(nWp[0], pristine + a); // seam opens at first mark
            nWm[0] = Math.max(nWm[0], pristine - a);
            long[] nWpp = States.merge(st.wpp, States.bump(st.wp, size, a));
            long[] nWpm = States.merge(st.wpm, States.bump(st.wp, size, -a));
            long[] nWmp = States.merge(st.wmp, States.bump(st.wm, size, a));
            long[] nWmm = States.merge(st.wmm, States.bump(st.wm, size, -a));
            // Middle closes read the pre-step wpp/wpm and wmp/wmm.
            nWp = States.merge(nWp, States.shiftAdd(st.wpp, size, -a));
            nWp = States.merge(nWp, States.shiftAdd(st.wpm, size, a));
            nWm = States.merge(nWm, States.shiftAdd(st.wmp, size, -a));
            nWm = States.merge(nWm, States.shiftAdd(st.wmm, size, a));

            // The seam close reads the pre-step wp/wm, so it runs last.
            long[] nFz = States.merge(
                States.merge(st.fz, States.shiftAdd(st.wp, size, -a)),
                States.shiftAdd(st.wm, size, a)
            );

            st.closed = nClosed;
            st.op = nOp;
            st.om = nOm;
            st.wp = nWp;
            st.wm = nWm;
            st.wpp = nWpp;
            st.wpm = nWpm;
            st.wmp = nWmp;
            st.wmm = nWmm;
            st.fz = nFz;
        }

        long best = 0;
        for (int i = 0; i < size; i++) {
            best = Math.max(best, Math.max(st.closed[i], st.fz[i]));
        }
        return best;
    }

    // Phase-0 vectors: closed[j] = j pairs done; op/om = one open pair that
    // was started with a +/- and still owes its opposite sign.
    //
    // Phase-1 vectors: wp/wm = the seam pair open, started +/-; wXY = seam X
    // and an open middle pair Y; fz = the seam pair has closed.
    private static class States {

        long[] closed, op, om, wp, wm, wpp, wpm, wmp, wmm, fz;
        final int size;

        States(int size) {
            this.size = size;
            closed = filled();
            op = filled();
            om = filled();
            closed[0] = 0;
            wp = filled();
            wm = filled();
            wpp = filled();
            wpm = filled();
            wmp = filled();
            wmm = filled();
            fz = filled();
        }

        private long[] filled() {
            long[] out = new long[size];
            Arrays.fill(out, NEG);
            return out;
        }

        // Close a pair: the count grows by one.
        static long[] shiftAdd(long[] s, int size, long d) {
            long[] out = new long[size];
            Arrays.fill(out, NEG);
            for (int i = 1; i < size; i++) {
                if (s[i - 1] > NEG) {
                    out[i] = s[i - 1] + d;
                }
            }
            return out;
        }

        static long[] bump(long[] s, int size, long d) {
            long[] out = new long[size];
            for (int i = 0; i < size; i++) {
                out[i] = s[i] > NEG ? s[i] + d : NEG;
            }
            return out;
        }

        static long[] merge(long[] a, long[] b) {
            long[] out = new long[a.length];
            for (int i = 0; i < a.length; i++) {
                out[i] = Math.max(a[i], b[i]);
            }
            return out;
        }
    }
}
