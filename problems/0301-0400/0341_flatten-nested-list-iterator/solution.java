import java.util.ArrayList;
import java.util.List;

class NestedIterator {

    private final List<Integer> values;
    private int cursor;

    public NestedIterator(NestedInteger nestedList) {
        values = new ArrayList<>();
        for (NestedInteger item : nestedList.getList()) walk(item);
        cursor = 0;
    }

    private void walk(NestedInteger node) {
        if (node.isInteger()) {
            values.add(node.getInteger());
            return;
        }
        for (NestedInteger child : node.getList()) walk(child);
    }

    public int next() {
        return values.get(cursor++);
    }

    public boolean hasNext() {
        return cursor < values.size();
    }
}
