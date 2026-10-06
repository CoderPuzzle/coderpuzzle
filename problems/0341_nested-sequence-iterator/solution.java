/*
 * This is the interface that allows for creating nested lists.
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * public class NestedInteger {
 *     // @return true if this NestedInteger holds a single integer
 *     public boolean isInteger();
 *     // @return the single integer held, or null for a nested list
 *     public Integer getInteger();
 *     // Set this NestedInteger to hold a single integer.
 *     public void setInteger(int value);
 *     // Add a nested integer to this NestedInteger's list.
 *     public void add(NestedInteger ni);
 *     // @return the nested list held, or an empty list for a single integer
 *     public java.util.List<NestedInteger> getList();
 * }
 */

import java.util.ArrayList;
import java.util.List;

class NestedSequenceIterator {

    private final List<Integer> values;
    private int cursor;

    public NestedSequenceIterator(NestedInteger nestedList) {
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

    public int nextValue() {
        return values.get(cursor++);
    }

    public boolean hasMore() {
        return cursor < values.size();
    }
}
