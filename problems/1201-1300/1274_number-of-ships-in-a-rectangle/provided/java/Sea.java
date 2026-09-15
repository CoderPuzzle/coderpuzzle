/** Problem-provided oracle (Sea). Compiled with every submission
 * by the judge; never editable in the editor. This file is the hidden
 * implementation — solvers see only the public API documented in the
 * starter. Constructed from the case state (ships, budget and the query
 * budget). */
import java.util.List;

public class Sea {
    private final int[][] ships;
    private long budget;

    public Sea(List<Object> shipData, long budget) {
        this.ships = new int[shipData.size()][];
        for (int i = 0; i < shipData.size(); i++) {
            List<Object> point = asRow(shipData.get(i), i);
            this.ships[i] = new int[] {
                ((Number) point.get(0)).intValue(),
                ((Number) point.get(1)).intValue(),
            };
        }
        this.budget = budget;
    }

    private static List<Object> asRow(Object value, int index) {
        if (value instanceof List<?> list) {
            @SuppressWarnings("unchecked")
            List<Object> cast = (List<Object>) list;
            return cast;
        }
        throw new IllegalArgumentException("Row " + index + " must be a list");
    }

    public boolean hasShips(int[] topRight, int[] bottomLeft) {
        if (budget <= 0) {
            throw new IllegalStateException("Sea query budget exhausted");
        }
        budget -= 1;
        for (int[] ship : ships) {
            if (ship[0] >= bottomLeft[0] && ship[0] <= topRight[0]
                && ship[1] >= bottomLeft[1] && ship[1] <= topRight[1]) {
                return true;
            }
        }
        return false;
    }
}
