/*
 * This is the interface that allows for creating nested lists.
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * class NestedInteger {
 *   public:
 *     // Return true if this NestedInteger holds a single integer.
 *     bool isInteger() const;
 *     // Return the single integer held; undefined for a nested list.
 *     int getInteger() const;
 *     // Set this NestedInteger to hold a single integer.
 *     void setInteger(int value);
 *     // Add a nested integer to this NestedInteger's list.
 *     void add(const NestedInteger &ni);
 *     // Return the nested list held; undefined for a single integer.
 *     const vector<NestedInteger> &getList() const;
 * };
 */

#include <vector>

class NestedSequenceIterator {
  public:
    NestedSequenceIterator(NestedInteger nestedList) {
        for (const NestedInteger &item : nestedList.getList())
            walk(item);
        cursor = 0;
    }

    int nextValue() { return values[cursor++]; }

    bool hasMore() { return cursor < values.size(); }

  private:
    void walk(const NestedInteger &node) {
        if (node.isInteger()) {
            values.push_back(static_cast<int>(node.getInteger()));
            return;
        }
        for (const NestedInteger &child : node.getList())
            walk(child);
    }

    std::vector<int> values;
    size_t cursor = 0;
};
