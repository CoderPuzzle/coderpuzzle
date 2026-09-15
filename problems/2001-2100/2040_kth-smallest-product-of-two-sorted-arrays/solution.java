class Solution {

    public long kthSmallestProduct(int[] nums1, int[] nums2, long k) {
        long lo = -10_000_000_000L - 1,
            hi = 10_000_000_000L + 1;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (countLe(mid, nums1, nums2) >= k) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return lo;
    }

    private long countLe(long v, int[] nums1, int[] nums2) {
        long cnt = 0;
        int n2 = nums2.length;
        for (int x : nums1) {
            if (x > 0) {
                // x * y <= v  ->  y <= floor(v / x)
                long bound = Math.floorDiv(v, x);
                cnt += upperBound(nums2, bound);
            } else if (x < 0) {
                // x * y <= v, x < 0  ->  y >= ceil(v / x)
                long bound = -Math.floorDiv(-v, x);
                cnt += n2 - lowerBound(nums2, bound);
            } else {
                // x == 0: product is 0
                if (v >= 0) {
                    cnt += n2;
                }
            }
        }
        return cnt;
    }

    // number of elements <= t
    private static int upperBound(int[] a, long t) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] <= t) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }

    // number of elements < t
    private static int lowerBound(int[] a, long t) {
        int lo = 0,
            hi = a.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (a[mid] < t) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
