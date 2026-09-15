import java.util.ArrayList;
import java.util.List;

class Solution {

    public long weightedSum(int[] parent, int[] nums) {
        int n = parent.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; ++i) {
            children.add(new ArrayList<>());
        }
        for (int i = 1; i < n; ++i) {
            children.get(parent[i]).add(i);
        }

        int[] depth = new int[n];
        int[] queue = new int[n];
        int head = 0;
        int tail = 0;
        depth[0] = 1;
        queue[tail++] = 0;
        while (head < tail) {
            int node = queue[head++];
            for (int child : children.get(node)) {
                depth[child] = depth[node] + 1;
                queue[tail++] = child;
            }
        }

        int height = 0;
        for (int d : depth) {
            height = Math.max(height, d);
        }

        long total = 0;
        for (int i = 0; i < n; ++i) {
            total += (long) nums[i] * (height - depth[i] + 1);
        }
        return total;
    }
}
