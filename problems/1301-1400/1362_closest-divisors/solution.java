class Solution {

    public int[] closestDivisors(int num) {
        // The closest pair for a product m has its smaller factor as large
        // as possible: the first divisor found walking down from isqrt(m).
        int[] a = closest(num + 1);
        int[] b = closest(num + 2);
        return a[1] - a[0] <= b[1] - b[0] ? a : b;
    }

    private int[] closest(long m) {
        int d = (int) Math.sqrt((double) m);
        // Correct any float rounding at the square root before dividing.
        while ((long) d * d > m) {
            --d;
        }
        while ((long) (d + 1) * (d + 1) <= m && m % (d + 1) == 0) {
            ++d;
        }
        while (m % d != 0) {
            --d;
        }
        return new int[] { d, (int) (m / d) };
    }
}
