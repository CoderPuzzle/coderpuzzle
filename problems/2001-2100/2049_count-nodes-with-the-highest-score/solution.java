import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countHighestScoreNodes(int[] parents) {
        int n = parents.length;
        List<Integer>[] children = new ArrayList[n];
        for (int node = 0; node < n; node++) {
            children[node] = new ArrayList<>();
        }
        for (int node = 1; node < n; node++) {
            children[parents[node]].add(node);
        }

        int[] order = new int[n];
        int orderLength = 0;
        int[] stack = new int[n];
        int stackSize = 0;
        stack[stackSize++] = 0;
        while (stackSize > 0) {
            int node = stack[--stackSize];
            order[orderLength++] = node;
            for (int child : children[node]) {
                stack[stackSize++] = child;
            }
        }

        int[] subtree = new int[n];
        long highest = 0;
        int count = 0;
        for (int index = orderLength - 1; index >= 0; index--) {
            int node = order[index];
            int size = 1;
            long score = 1;
            for (int child : children[node]) {
                size += subtree[child];
                score *= subtree[child];
            }
            subtree[node] = size;
            int outside = n - size;
            if (outside != 0) {
                score *= outside;
            }
            if (score > highest) {
                highest = score;
                count = 1;
            } else if (score == highest) {
                count++;
            }
        }
        return count;
    }
}
