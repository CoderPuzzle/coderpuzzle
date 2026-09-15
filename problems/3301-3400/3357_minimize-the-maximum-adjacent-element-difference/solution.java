import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.TreeSet;

class Solution {

    public int minDifference(int[] nums) {
        // Binary search the answer d and probe feasibility. A probe checks
        // the unchangeable adjacent known pairs, then every maximal run of
        // -1s. Order the pair as x <= y: a run between lo <= hi accepts x
        // alone, y alone (a value within d of both ends), or — with two or
        // more missing cells — a straddle (x within d of lo, y within d of
        // hi). "Far" mode stabs every run's both-end interval with two
        // free values; "close" mode slides a pair with y - x <= d over
        // candidate spots and intersects the one interval each run leaves
        // for y. Reach values hit ~4*10^9 which overflows int, so the
        // interval math lives in longs; the answer itself is < 10^9.
        int knownCount = 0;
        long mn = Long.MAX_VALUE;
        long mx = Long.MIN_VALUE;
        for (int v : nums) {
            if (v != -1) {
                knownCount++;
                mn = Math.min(mn, v);
                mx = Math.max(mx, v);
            }
        }
        if (knownCount < 2) {
            return 0; // fill everything with the single known value (or 1)
        }
        // runs: {lo, hi, oneSided, length}; a one-sided run touches an
        // array end, so lo == hi is its single known neighbour
        List<long[]> runs = new ArrayList<>();
        long prev = 0;
        long run = 0;
        for (int v : nums) {
            if (v == -1) {
                run++;
                continue;
            }
            if (run != 0) {
                if (prev != 0) {
                    runs.add(new long[] { Math.min(prev, v), Math.max(prev, v), 0, run });
                } else {
                    runs.add(new long[] { v, v, 1, run });
                }
                run = 0;
            }
            prev = v;
        }
        if (run != 0) {
            runs.add(new long[] { prev, prev, 1, run });
        }
        long knownAdj = 0;
        for (int i = 1; i < nums.length; i++) {
            if (nums[i - 1] != -1 && nums[i] != -1) {
                knownAdj = Math.max(knownAdj, Math.abs((long) nums[i] - nums[i - 1]));
            }
        }
        long lo = 0;
        long hi = mx - mn;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (feasible(nums, runs, knownAdj, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    private boolean feasible(int[] nums, List<long[]> runs, long knownAdj, long d) {
        if (d < knownAdj) {
            return false;
        }
        // FAR: two stabbers for every run's both-end interval
        boolean broken = false;
        List<long[]> ivs = new ArrayList<>();
        for (long[] r : runs) {
            long a = r[2] == 1 ? r[0] - d : r[1] - d;
            if (a > r[0] + d) {
                broken = true;
                break;
            }
            ivs.add(new long[] { a, r[0] + d });
        }
        if (!broken) {
            if (ivs.isEmpty()) {
                return true; // no runs: known pairs were the only bound
            }
            ivs.sort(Comparator.comparingLong(t -> t[1]));
            long p = ivs.get(0)[1]; // classic right-endpoint stab
            List<long[]> rest = new ArrayList<>();
            for (long[] t : ivs) {
                if (t[0] > p || p > t[1]) {
                    rest.add(t);
                }
            }
            if (rest.isEmpty()) {
                return true;
            }
            long q = rest.get(0)[1];
            boolean all = true;
            for (long[] t : rest) {
                if (t[0] > q || q > t[1]) {
                    all = false;
                    break;
                }
            }
            if (all) {
                return true;
            }
        }
        // CLOSE: y - x <= d; intersect the interval each run leaves for y
        TreeSet<Long> cand = new TreeSet<>();
        cand.add(1L);
        for (long[] r : runs) {
            cand.add(r[0] - d);
            cand.add(r[0] + d);
            cand.add(r[0] - 2 * d);
            cand.add(r[1] - d);
            cand.add(r[1] + d);
            cand.add(r[1] - 2 * d);
        }
        for (long x : cand) {
            if (x < 1) {
                continue;
            }
            long glo = 1;
            long ghi = 4_000_000_000L;
            boolean ok = true;
            for (long[] r : runs) {
                long jlo = r[2] == 1 ? r[0] - d : r[1] - d;
                long jhi = r[0] + d;
                if (jlo <= x && x <= jhi) {
                    continue; // x alone covers this run
                }
                long alo;
                long ahi;
                if (r[2] != 1 && r[3] >= 2 && r[0] - d <= x && x <= r[0] + d) {
                    alo = r[1] - d;
                    ahi = r[1] + d; // straddle: y takes the far end
                } else {
                    alo = jlo;
                    ahi = jhi; // y must cover both ends
                }
                if (alo > ahi) {
                    ok = false;
                    break;
                }
                glo = Math.max(glo, alo);
                ghi = Math.min(ghi, ahi);
                if (glo > ghi) {
                    ok = false;
                    break;
                }
            }
            if (ok && glo <= x + d && ghi >= x) {
                return true;
            }
        }
        return false;
    }
}
