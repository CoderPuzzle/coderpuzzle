import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] getCoprimes(int[] nums, int[][] edges) {
        // Values only reach 50, so track ancestors per value: on the current
        // root path, stacks[v] holds the nodes carrying value v, deepest
        // last. A node's answer is the deepest stack top among the values
        // coprime with its own.
        int n = nums.length;
        List<List<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }
        List<List<Integer>> coprimes = new ArrayList<>(51);
        for (int v = 0; v <= 50; v++) {
            List<Integer> list = new ArrayList<>();
            for (int w = 1; w <= 50; w++) {
                if (gcd(v, w) == 1) {
                    list.add(w);
                }
            }
            coprimes.add(list);
        }

        int[] ans = new int[n];
        int[] depth = new int[n];
        List<Deque<Integer>> stacks = new ArrayList<>(51);
        for (int v = 0; v <= 50; v++) {
            stacks.add(new ArrayDeque<>());
        }
        // The tree can be one 1e5-deep chain, so the traversal is
        // iterative: enter frames answer a node against the current stacks
        // and push it onto its value's stack, exit frames pop it again.
        // Each frame is {node, parent, 0 = enter, 1 = exit}.
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] { 0, -1, 0 });
        while (!stack.isEmpty()) {
            int[] frame = stack.pop();
            int node = frame[0],
                parent = frame[1];
            if (frame[2] == 1) {
                stacks.get(nums[node]).pop();
                continue;
            }
            int best = -1,
                bestDepth = -1;
            for (int w : coprimes.get(nums[node])) {
                Deque<Integer> candidates = stacks.get(w);
                if (!candidates.isEmpty()) {
                    int top = candidates.peek();
                    if (depth[top] > bestDepth) {
                        best = top;
                        bestDepth = depth[top];
                    }
                }
            }
            ans[node] = best;
            stacks.get(nums[node]).push(node);
            stack.push(new int[] { node, parent, 1 });
            for (int y : adj.get(node)) {
                if (y != parent) {
                    depth[y] = depth[node] + 1;
                    stack.push(new int[] { y, node, 0 });
                }
            }
        }
        return ans;
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
