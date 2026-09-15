import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] smallestMissingValueSubtree(int[] parents, int[] nums) {
        int n = parents.length;
        List<List<Integer>> children = new ArrayList<>(n);
        for (int node = 0; node < n; ++node) {
            children.add(new ArrayList<>());
        }
        int oneNode = -1;
        for (int node = 0; node < n; ++node) {
            if (parents[node] != -1) {
                children.get(parents[node]).add(node);
            }
            if (nums[node] == 1) {
                oneNode = node;
            }
        }

        int[] answers = new int[n];
        java.util.Arrays.fill(answers, 1);
        if (oneNode == -1) {
            return answers;
        }

        boolean[] visited = new boolean[n];
        boolean[] present = new boolean[n + 2];
        int missing = 1;
        for (int ancestor = oneNode; ancestor != -1; ancestor = parents[ancestor]) {
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(ancestor);
            while (!stack.isEmpty()) {
                int node = stack.pop();
                if (visited[node]) {
                    continue;
                }
                visited[node] = true;
                if (nums[node] < present.length) {
                    present[nums[node]] = true;
                }
                for (int child : children.get(node)) {
                    stack.push(child);
                }
            }
            while (present[missing]) {
                ++missing;
            }
            answers[ancestor] = missing;
        }
        return answers;
    }
}
