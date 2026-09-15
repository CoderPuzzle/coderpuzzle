import java.util.HashMap;
import java.util.Map;

class Spreadsheet {

    // A hash map from cell reference to its current value. Unset cells
    // simply read as 0 through a defaulting lookup, and resetCell writes
    // 0 rather than deleting, so every cell state lives in one place.
    // getValue drops the leading '=', splits on '+', and classifies each
    // operand by its first character: a capital letter means a cell
    // reference, anything else is a non-negative integer literal.
    private final Map<String, Integer> values = new HashMap<>();

    public Spreadsheet(int rows) {}

    public void setCell(String cell, int value) {
        values.put(cell, value);
    }

    public void resetCell(String cell) {
        values.put(cell, 0);
    }

    public int getValue(String formula) {
        int total = 0;
        for (String operand : formula.substring(1).split("\\+")) {
            if (operand.charAt(0) >= 'A' && operand.charAt(0) <= 'Z') {
                Integer stored = values.get(operand);
                total += stored == null ? 0 : stored;
            } else {
                total += Integer.parseInt(operand);
            }
        }
        return total;
    }
}
