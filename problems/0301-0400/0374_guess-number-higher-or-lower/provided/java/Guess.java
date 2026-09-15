/** The guess API (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: guess(num) reports how the number it
 * was given compares to the case's hidden pick — above it, below it, or
 * exactly it. Solvers see only the public API documented in the
 * starter. */
public class Guess {

    private final long pick;
    private long budget;

    public Guess(long pick, long budget) {
        this.pick = pick;
        this.budget = budget;
    }

    public int guess(int num) {
        if (budget <= 0) {
            throw new IllegalStateException("Guess query budget exhausted");
        }
        budget -= 1;
        if (num > pick) {
            return -1;
        }
        if (num < pick) {
            return 1;
        }
        return 0;
    }
}
