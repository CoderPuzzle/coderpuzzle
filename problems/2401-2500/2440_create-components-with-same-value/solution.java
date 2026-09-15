import java.util.ArrayList;
import java.util.List;

class Solution {

    public int componentValue(int[] nums, int[][] edges) {
        int n = nums.length;
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adjacency.get(edge[0]).add(edge[1]);
            adjacency.get(edge[1]).add(edge[0]);
        }

        // iterative DFS from node 0: parents + a visitation order whose
        // reverse is a valid post-order
        int[] parent = new int[n];
        parent[0] = -1;
        int[] order = new int[n];
        int[] stack = new int[n];
        int top = 0,
            seen = 0;
        stack[top++] = 0;
        while (top > 0) {
            int node = stack[--top];
            order[seen++] = node;
            for (int nxt : adjacency.get(node)) {
                if (nxt != parent[node]) {
                    parent[nxt] = node;
                    stack[top++] = nxt;
                }
            }
        }

        // subtree sums: everything a node keeps after its own greedy cuts
        int[] sums = new int[n];
        int largest = 0;
        for (int i = 0; i < n; i++) {
            sums[i] = nums[i];
            largest = Math.max(largest, nums[i]);
        }
        for (int i = n - 1; i >= 0; i--) {
            int node = order[i];
            if (parent[node] >= 0) {
                sums[parent[node]] += sums[node];
            }
        }

        int total = sums[0];
        List<Integer> counts = new ArrayList<>();
        for (int divisor = 1; (long) divisor * divisor <= total; divisor++) {
            if (total % divisor == 0) {
                counts.add(divisor);
                if (divisor != total / divisor) {
                    counts.add(total / divisor);
                }
            }
        }
        counts.sort((a, b) -> b - a);
        for (int k : counts) {
            int value = total / k;
            if (value < largest) {
                continue;
            }
            int components = 0;
            for (int s : sums) {
                if (s % value == 0) {
                    components++;
                }
            }
            if (components == k) {
                return k - 1;
            }
        }
        return 0;
    }
}
