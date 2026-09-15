class Solution {

    public int minimizeSet(int divisor1, int divisor2, int uniqueCnt1, int uniqueCnt2) {
        // Binary search the smallest feasible maximum m. For a candidate m:
        //   m - m/d1 numbers arr1 can take, m - m/d2 for arr2, and
        //   m - m/lcm blocked by neither; 64-bit math since the lcm and the
        //   search bound can pass 2^31.
        long total = (long) uniqueCnt1 + uniqueCnt2;
        long shared = ((long) divisor1 / gcd(divisor1, divisor2)) * divisor2;
        long lo = 1;
        long hi = 2 * total;
        while (lo < hi) {
            long mid = lo + (hi - lo) / 2;
            if (
                mid - mid / divisor1 >= uniqueCnt1 && mid - mid / divisor2 >= uniqueCnt2 && mid - mid / shared >= total
            ) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    private long gcd(long a, long b) {
        while (b != 0) {
            long t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
