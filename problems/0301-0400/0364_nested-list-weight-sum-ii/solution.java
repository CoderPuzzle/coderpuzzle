import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int depthSumInverse(NestedInteger nestedList) {
        List<NestedInteger> level = new ArrayList<>(nestedList.getList());
        int total = 0;
        int flat = 0;
        while (!level.isEmpty()) {
            List<NestedInteger> nextLevel = new ArrayList<>();
            int levelSum = 0;
            for (NestedInteger node : level) {
                if (node.isInteger()) {
                    levelSum += node.getInteger();
                } else {
                    nextLevel.addAll(node.getList());
                }
            }
            flat += levelSum;
            total += flat;
            level = nextLevel;
        }
        return total;
    }
}
