import java.util.ArrayList;
import java.util.List;

class Excel {

    // Cell values beside per-cell formula lists, both plain grids: set()
    // writes the literal and empties the cell's formula list; sum()
    // installs the flattened reference list parsed from numbers; get()
    // resolves on demand, recursing through formula cells so a later set()
    // on a source cell is picked up by the next get() of anything
    // downstream.
    private final int[][] values;
    private final List<int[]>[][] formulas;

    @SuppressWarnings("unchecked")
    public Excel(int height, String width) {
        int columns = width.charAt(0) - 'A' + 1;
        values = new int[height + 1][columns];
        formulas = (List<int[]>[][]) new ArrayList<?>[height + 1][columns];
        for (List<int[]>[] row : formulas) {
            for (int column = 0; column < columns; column++) {
                row[column] = new ArrayList<>();
            }
        }
    }

    public void set(int row, String column, int val) {
        int col = column.charAt(0) - 'A';
        values[row][col] = val;
        formulas[row][col].clear();
    }

    public int get(int row, String column) {
        return value(row, column.charAt(0) - 'A');
    }

    public int sum(int row, String column, String[] numbers) {
        int col = column.charAt(0) - 'A';
        List<int[]> references = new ArrayList<>();
        for (String number : numbers) {
            int separator = number.indexOf(':');
            if (separator < 0) {
                references.add(cell(number));
                continue;
            }
            int[] first = cell(number.substring(0, separator));
            int[] last = cell(number.substring(separator + 1));
            for (int r = first[0]; r <= last[0]; r++) {
                for (int c = first[1]; c <= last[1]; c++) {
                    references.add(new int[] { r, c });
                }
            }
        }
        formulas[row][col] = references;
        return value(row, col);
    }

    // A cell token is one column letter followed by the row number.
    private int[] cell(String token) {
        return new int[] { Integer.parseInt(token.substring(1)), token.charAt(0) - 'A' };
    }

    private int value(int row, int col) {
        List<int[]> references = formulas[row][col];
        if (references.isEmpty()) {
            return values[row][col];
        }
        int total = 0;
        // Recursing into each reference is the whole update story: no
        // propagation, no cache, the chain recomputed on every get.
        for (int[] reference : references) {
            total += value(reference[0], reference[1]);
        }
        return total;
    }
}
