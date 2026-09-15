#include <vector>

class Solution {
  public:
    int depthSumInverse(NestedInteger nestedList) {
        std::vector<const NestedInteger *> level;
        for (const NestedInteger &item : nestedList.getList())
            level.push_back(&item);
        int total = 0;
        int flat = 0;
        while (!level.empty()) {
            std::vector<const NestedInteger *> nextLevel;
            int levelSum = 0;
            for (const NestedInteger *node : level) {
                if (node->isInteger()) {
                    levelSum += static_cast<int>(node->getInteger());
                } else {
                    for (const NestedInteger &child : node->getList())
                        nextLevel.push_back(&child);
                }
            }
            flat += levelSum;
            total += flat;
            level = std::move(nextLevel);
        }
        return total;
    }
};
