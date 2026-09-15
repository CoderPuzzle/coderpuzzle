/** Problem-provided oracle (Robot). Compiled with every submission
 * by the judge; never editable in the editor. This file is the hidden
 * implementation — solvers see only the public API documented in the
 * starter. Constructed from the case state (room, start, budget and the query
 * budget). */
import java.util.ArrayList;
import java.util.List;

public class Robot {
    private static final int[][] DIRECTIONS = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    private final int[][] room;
    private final int rows;
    private final int cols;
    private int row;
    private int col;
    private int face; // starts facing up, LeetCode convention
    private final java.util.TreeSet<long[]> cleaned = new java.util.TreeSet<>(
        (a, b) -> a[0] != b[0] ? Long.compare(a[0], b[0]) : Long.compare(a[1], b[1])
    );
    private long budget;

    public Robot(List<Object> roomData, List<Object> start, long budget) {
        this.room = new int[roomData.size()][];
        for (int r = 0; r < roomData.size(); r++) {
            List<Object> rowValues = asRow(roomData.get(r), r);
            this.room[r] = new int[rowValues.size()];
            for (int c = 0; c < rowValues.size(); c++) {
                this.room[r][c] = ((Number) rowValues.get(c)).intValue();
            }
        }
        this.rows = this.room.length;
        this.cols = this.rows == 0 ? 0 : this.room[0].length;
        this.row = ((Number) start.get(0)).intValue();
        this.col = ((Number) start.get(1)).intValue();
        this.budget = budget;
        clean();
    }

    private static List<Object> asRow(Object value, int index) {
        if (value instanceof List<?> list) {
            @SuppressWarnings("unchecked")
            List<Object> cast = (List<Object>) list;
            return cast;
        }
        throw new IllegalArgumentException("Row " + index + " must be a list");
    }

    private void spend() {
        if (budget <= 0) {
            throw new IllegalStateException("Robot operation budget exhausted");
        }
        budget -= 1;
    }

    public boolean move() {
        spend();
        int nr = row + DIRECTIONS[face][0];
        int nc = col + DIRECTIONS[face][1];
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || room[nr][nc] == 0) {
            return false; // wall or obstacle: stays in place
        }
        row = nr;
        col = nc;
        return true;
    }

    public void turnLeft() {
        spend();
        face = (face + 3) % 4;
    }

    public void turnRight() {
        spend();
        face = (face + 1) % 4;
    }

    public void clean() {
        spend();
        cleaned.add(new long[] {row, col});
    }

    public Object verdict() {
        List<Object> cells = new ArrayList<>();
        for (long[] cell : cleaned) {
            List<Object> pair = new ArrayList<>();
            pair.add((int) cell[0]);
            pair.add((int) cell[1]);
            cells.add(pair);
        }
        return cells;
    }
}
