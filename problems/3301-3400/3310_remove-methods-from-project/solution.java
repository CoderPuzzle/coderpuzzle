import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] remainingMethods(int n, int k, int[][] invocations) {
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] edge : invocations) {
            graph.get(edge[0]).add(edge[1]);
        }
        // Iterative DFS from k: a 10^5-long invocation chain would overflow
        // the recursion stack under the judged limits.
        boolean[] suspicious = new boolean[n];
        suspicious[k] = true;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(k);
        while (!stack.isEmpty()) {
            int node = stack.pop();
            for (int nxt : graph.get(node)) {
                if (!suspicious[nxt]) {
                    suspicious[nxt] = true;
                    stack.push(nxt);
                }
            }
        }
        // The group may only be removed when no outside method invokes
        // into it; otherwise nothing is removed at all.
        for (int[] edge : invocations) {
            if (!suspicious[edge[0]] && suspicious[edge[1]]) {
                int[] all = new int[n];
                for (int i = 0; i < n; i++) {
                    all[i] = i;
                }
                return all;
            }
        }
        int count = 0;
        for (int node = 0; node < n; node++) {
            if (!suspicious[node]) count++;
        }
        int[] remaining = new int[count];
        int index = 0;
        for (int node = 0; node < n; node++) {
            if (!suspicious[node]) remaining[index++] = node;
        }
        return remaining;
    }
}
