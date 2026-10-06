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

class NestedSequenceIterator {

    public NestedSequenceIterator(NestedInteger nestedList) {}

    public int nextValue() {}

    public boolean hasMore() {}
}
