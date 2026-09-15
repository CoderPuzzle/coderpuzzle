import java.util.List;

/** Problem-provided oracle (CategoryHandler). Compiled with every
 * submission by the judge; never editable in the editor. This file is the
 * hidden implementation — solvers see only the public API documented in
 * the starter. Constructed from the case state (the category assignment
 * plus the query budget); only haveSameCategory reveals it. */
public class CategoryHandler {

    private final int[] category;
    private long budget;

    public CategoryHandler(List<Object> values, long budget) {
        this.category = new int[values.size()];
        for (int i = 0; i < values.size(); i++) {
            this.category[i] = ((Number) values.get(i)).intValue();
        }
        this.budget = budget;
    }

    public boolean haveSameCategory(int a, int b) {
        spend();
        if (a < 0 || a >= category.length || b < 0 || b >= category.length) {
            return false;
        }
        return category[a] == category[b];
    }

    private void spend() {
        if (budget <= 0) {
            throw new IllegalStateException("CategoryHandler query budget exhausted");
        }
        budget -= 1;
    }
}
