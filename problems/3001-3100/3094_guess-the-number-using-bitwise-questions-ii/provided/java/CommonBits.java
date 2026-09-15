/** The mutating hidden-number API (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: commonBits(num) counts how many of the
 * low 30 bits of the CURRENT number agree with num, then flips those
 * bits (n ^= num), and reports the count. The instance is fresh per
 * case, seeded with the case's initial n. Solvers see only the public
 * API documented in the starter. */
public class CommonBits {

    private static final int LOW_30 = (1 << 30) - 1;

    private int n;
    private long budget;

    public CommonBits(int n, long budget) {
        this.n = n;
        this.budget = budget;
    }

    public int commonBits(int num) {
        if (budget <= 0) {
            throw new IllegalStateException("CommonBits query budget exhausted");
        }
        budget -= 1;
        int diff = (n ^ num) & LOW_30;
        n ^= num;
        return 30 - Integer.bitCount(diff);
    }
}
