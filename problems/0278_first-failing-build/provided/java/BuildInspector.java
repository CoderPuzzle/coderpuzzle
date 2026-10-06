/** The bad-version API (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: isFailingBuild(version) reports whether
 * that version fails the quality check — every version from the case's
 * hidden first bad one onward does. Solvers see only the public API
 * documented in the starter. */
public class BuildInspector {

    private final long bad;
    private long budget;

    public BuildInspector(long bad, long budget) {
        this.bad = bad;
        this.budget = budget;
    }

    public boolean isFailingBuild(int version) {
        if (budget <= 0) {
            throw new IllegalStateException("BuildInspector query budget exhausted");
        }
        budget -= 1;
        return version >= bad;
    }
}
