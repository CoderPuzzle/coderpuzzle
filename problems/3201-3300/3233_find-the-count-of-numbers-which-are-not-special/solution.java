class Solution {

    public int nonSpecialCount(int l, int r) {
        // A number is special exactly when it is the square of a prime:
        // p*p has precisely the proper divisors 1 and p, any other number
        // has more than two (three divisors total forces the form
        // prime^2), and 1 itself has none. The specials in [l, r] are
        // therefore the squares of primes in [ceil(sqrt(l)),
        // floor(sqrt(r))] — at most sqrt(10^9) ~ 31623 candidates,
        // counted with one sieve. Square roots start from Math.sqrt but
        // are corrected with exact long multiplies, so rounding can
        // never move a boundary.
        int hi = (int) Math.sqrt(r);
        while ((long) hi * hi > r) {
            --hi;
        }
        while ((long) (hi + 1) * (hi + 1) <= r) {
            ++hi;
        }
        int lo = (int) Math.sqrt(l - 1) + 1; // smallest s with s*s >= l
        while ((long) lo * lo < l) {
            ++lo;
        }
        while ((long) (lo - 1) * (lo - 1) >= l && lo > 1) {
            --lo;
        }
        boolean[] composite = new boolean[hi + 1];
        int specials = 0;
        for (int p = 2; p <= hi; ++p) {
            if (composite[p]) {
                continue;
            }
            if (p >= lo) {
                ++specials;
            }
            for (long m = (long) p * p; m <= hi; m += p) {
                composite[(int) m] = true;
            }
        }
        return r - l + 1 - specials;
    }
}
