#include <vector>

class NestedIterator {
  public:
    NestedIterator(NestedInteger nestedList) {
        for (const NestedInteger &item : nestedList.getList())
            walk(item);
        cursor = 0;
    }

    int next() { return values[cursor++]; }

    bool hasNext() { return cursor < values.size(); }

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
