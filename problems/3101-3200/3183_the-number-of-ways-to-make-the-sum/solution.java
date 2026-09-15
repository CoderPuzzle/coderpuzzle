class Solution {

    public int numberOfWays(int n) {
        // Count first with the unlimited coins {1, 2, 6}: once b six-coins
        // are set aside, the leftover r is filled freely by one- and
        // two-coins, which gives r / 2 + 1 arrangements per r. The value-4
        // coin exists exactly twice, so its contribution is zero, one, or
        // two indistinguishable copies, each leaving a smaller target for
        // the same count. Exact totals pass a billion, so accumulate in a
        // long and fold the modulus once at the end.
        final long modulo = 1000000007L;
        long total = 0;
        for (int fours : new int[] { 0, 4, 8 }) {
            for (long rest = n - fours; rest >= 0; rest -= 6) {
                total += rest / 2 + 1;
            }
        }
        return (int) (total % modulo);
    }
}
