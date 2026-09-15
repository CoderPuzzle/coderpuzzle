class Solution {

    private static class Fenwick {

        private final int n;
        private final long[] bit;

        Fenwick(int n) {
            this.n = n;
            this.bit = new long[n + 1];
        }

        void add(int i, long delta) {
            i += 1;
            while (i <= n) {
                bit[i] += delta;
                i += i & -i;
            }
        }

        long prefix(int i) {
            i += 1;
            long total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & -i;
            }
            return total;
        }

        long rangeSum(int l, int r) {
            return prefix(r) - prefix(l - 1);
        }
    }

    public long[] countOfPeaks(int[] nums, int[][] queries) {
        int n = nums.length;

        // Ordered peak positions plus a Fenwick tree holding
        // value[p] = p * (p - prev(p)) for every present peak p.
        java.util.TreeSet<Integer> peaks = new java.util.TreeSet<>();
        Fenwick fen = new Fenwick(n);

        for (int i = 1; i + 1 < n; i++) {
            if (isPeak(nums, i)) {
                insertPeak(peaks, fen, i);
            }
        }

        java.util.ArrayList<Long> resultList = new java.util.ArrayList<>();
        for (int[] q : queries) {
            if (q[0] == 1) {
                int l = q[1],
                    r = q[2];
                Integer aBoxed = peaks.higher(l);
                if (aBoxed == null || aBoxed >= r) {
                    resultList.add(0L);
                    continue;
                }
                int a = aBoxed;
                int b = peaks.lower(r);
                Integer qBoxed = peaks.lower(a);
                long qv = qBoxed == null ? 0 : qBoxed;
                long w = fen.rangeSum(a, b);
                resultList.add((long) r * (b - l) - w + (long) a * (l - qv));
            } else {
                int idx = q[1],
                    val = q[2];
                for (int j = Math.max(0, idx - 1); j <= Math.min(n - 1, idx + 1); j++) {
                    if (isPeak(nums, j)) {
                        removePeak(peaks, fen, j);
                    }
                }
                nums[idx] = val;
                for (int j = Math.max(0, idx - 1); j <= Math.min(n - 1, idx + 1); j++) {
                    if (isPeak(nums, j)) {
                        insertPeak(peaks, fen, j);
                    }
                }
            }
        }
        long[] answer = new long[resultList.size()];
        for (int i = 0; i < answer.length; i++) {
            answer[i] = resultList.get(i);
        }
        return answer;
    }

    private static boolean isPeak(int[] nums, int i) {
        int n = nums.length;
        return i > 0 && i < n - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1];
    }

    private static void insertPeak(java.util.TreeSet<Integer> peaks, Fenwick fen, int x) {
        Integer prevBoxed = peaks.lower(x),
            nextBoxed = peaks.higher(x);
        long prevP = prevBoxed == null ? 0 : prevBoxed,
            nextP = nextBoxed == null ? -1 : nextBoxed;
        peaks.add(x);
        fen.add(x, (long) x * (x - prevP));
        if (nextP >= 0) {
            fen.add((int) nextP, nextP * (nextP - x) - nextP * (nextP - prevP));
        }
    }

    private static void removePeak(java.util.TreeSet<Integer> peaks, Fenwick fen, int x) {
        Integer prevBoxed = peaks.lower(x),
            nextBoxed = peaks.higher(x);
        long prevP = prevBoxed == null ? 0 : prevBoxed,
            nextP = nextBoxed == null ? -1 : nextBoxed;
        peaks.remove(x);
        fen.add(x, -((long) x) * (x - prevP));
        if (nextP >= 0) {
            fen.add((int) nextP, nextP * (nextP - prevP) - nextP * (nextP - x));
        }
    }
}
