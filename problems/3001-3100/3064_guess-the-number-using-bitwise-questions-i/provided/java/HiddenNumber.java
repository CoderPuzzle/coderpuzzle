/** The common-set-bits API (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: commonSetBits(num) returns how many
 * bits the number it was given shares with the case's hidden n — the
 * popcount of their bitwise AND. Solvers see only the public API
 * documented in the statement. */
public class HiddenNumber {

    private final long n;
    private long budget;

    public HiddenNumber(long n, long budget) {
        this.n = n;
        this.budget = budget;
    }

    public int commonSetBits(int num) {
        if (budget <= 0) {
            throw new IllegalStateException("HiddenNumber query budget exhausted");
        }
        budget -= 1;
        return Long.bitCount(n & num);
    }
}
