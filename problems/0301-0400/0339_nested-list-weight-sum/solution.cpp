class Solution {
  public:
    int depthSum(NestedInteger nestedList) {
        int total = 0;
        for (const NestedInteger &item : nestedList.getList())
            total += walk(item, 1);
        return total;
    }

  private:
    int walk(const NestedInteger &node, int depth) const {
        if (node.isInteger())
            return static_cast<int>(node.getInteger()) * depth;
        int total = 0;
        for (const NestedInteger &child : node.getList())
            total += walk(child, depth + 1);
        return total;
    }
};
