class Solution {

    private int[][] st;
    private int[] nums;

    public int minStable(int[] nums, int maxC) {
        this.nums = nums;
        int n = nums.length;

        // Sparse table: st[k][i] is the gcd of nums[i .. i+2^k-1]. Two rows
        // tile any query window, so every window gcd is O(1) after the
        // O(n log n) build.
        int LOG = 32 - Integer.numberOfLeadingZeros(n);
        st = new int[LOG][];
        st[0] = nums.clone();
        for (int k = 1; k < LOG; ++k) {
            int half = 1 << (k - 1);
            int length = n - (1 << k) + 1;
            int[] prev = st[k - 1];
            int[] row = new int[length];
            for (int i = 0; i < length; ++i) row[i] = gcd(prev[i], prev[i + half]);
            st[k] = row;
        }

        // Feasibility for a target length k: every window of size k+1 must
        // be broken. Editing one element to 1 breaks every window that
        // contains it, so hitting a window's rightmost element covers the
        // maximal run of later window starts — the classic fixed-length
        // interval point cover, greedily optimal.
        int lo = 0,
            hi = n;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (feasible(mid, maxC)) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }

    private boolean feasible(int k, int maxC) {
        int width = k + 1;
        int n = nums.length;
        if (width > n) return true;
        int edits = 0;
        int covered = -1;
        for (int start = 0; start + width <= n; ++start) {
            if (start <= covered) continue;
            if (rangeGcd(start, start + width - 1) > 1) {
                covered = start + width - 1;
                ++edits;
                if (edits > maxC) return false;
            }
        }
        return true;
    }

    private int rangeGcd(int left, int right) {
        int k = 31 - Integer.numberOfLeadingZeros(right - left + 1);
        int span = 1 << k;
        return gcd(st[k][left], st[k][right - span + 1]);
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
