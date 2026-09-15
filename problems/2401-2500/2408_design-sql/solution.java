import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

class SQL {

    // One table record per name in a hash map: the declared column count,
    // an id -> row map, and a never-reset auto-increment counter. Failed
    // inserts never touch the counter, and removals never roll it back,
    // so the ids issued in a table strictly ascend and are never reused —
    // walking the row map in key order is therefore also the exp() output
    // order.
    private static final class Table {

        final int columns;
        // A TreeMap keeps the row ids ascending for exp() walks.
        final TreeMap<Integer, String[]> rows = new TreeMap<>();
        int nextId = 1;

        Table(int columns) {
            this.columns = columns;
        }
    }

    private final Map<String, Table> tables = new HashMap<>();

    public SQL(String[] names, int[] columns) {
        for (int i = 0; i < names.length; ++i) {
            tables.put(names[i], new Table(columns[i]));
        }
    }

    public boolean ins(String name, String[] row) {
        Table table = tables.get(name);
        if (table == null || row.length != table.columns) {
            return false;
        }
        table.rows.put(table.nextId++, row);
        return true;
    }

    public void rmv(String name, int rowId) {
        Table table = tables.get(name);
        if (table != null) {
            table.rows.remove(rowId);
        }
    }

    public String sel(String name, int rowId, int columnId) {
        Table table = tables.get(name);
        if (table == null) {
            return "<null>";
        }
        String[] row = table.rows.get(rowId);
        if (row == null || columnId < 1 || columnId > table.columns) {
            return "<null>";
        }
        return row[columnId - 1];
    }

    public String[] exp(String name) {
        Table table = tables.get(name);
        if (table == null) {
            return new String[] {};
        }
        List<String> lines = new ArrayList<>();
        for (Map.Entry<Integer, String[]> entry : table.rows.entrySet()) {
            StringBuilder line = new StringBuilder().append(entry.getKey());
            for (String cell : entry.getValue()) {
                line.append(',').append(cell);
            }
            lines.add(line.toString());
        }
        return lines.toArray(new String[0]);
    }
}
