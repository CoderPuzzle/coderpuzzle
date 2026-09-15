import java.util.List;

/** Problem-provided oracle (Street). Compiled with every submission
 * by the judge; never editable in the editor. This file is the hidden
 * implementation — solvers see only the public API documented in the
 * starter. Constructed from the case state (door states plus the query
 * budget); the agent starts at the first house. */
public class Street {

    private final int[] doors;
    private long budget;
    private int position;

    public Street(List<Object> values, long budget) {
        this.doors = new int[values.size()];
        for (int i = 0; i < values.size(); i++) {
            this.doors[i] = ((Number) values.get(i)).intValue();
        }
        this.budget = budget;
    }

    public void closeDoor() {
        spend();
        doors[position] = 0;
    }

    public boolean isDoorOpen() {
        spend();
        return doors[position] == 1;
    }

    public void moveRight() {
        spend();
        position = (position + 1) % doors.length;
    }

    private void spend() {
        if (budget <= 0) {
            throw new IllegalStateException("Street query budget exhausted");
        }
        budget -= 1;
    }
}
