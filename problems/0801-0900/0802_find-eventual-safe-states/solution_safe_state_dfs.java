import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public int[] eventualSafeNodes(int[][] graph) {
        int n = graph.length;
        // Memoized DFS on the graph as given: ask each node directly whether
        // every walk from it terminates, and cache the verdict. The stack is
        // explicit, so a 10^4-deep chain cannot overflow recursion.
        final int UNVISITED = 0;
        final int VISITING = 1;
        final int SAFE = 2;
        final int UNSAFE = 3;
        int[] state = new int[n];
        // Per-node scratch for the active frame; a node sits on the stack at
        // most once, so node indexing works for the cursor and the flag.
        int[] next = new int[n];
        boolean[] unsafeChild = new boolean[n];
        for (int start = 0; start < n; start++) {
            if (state[start] != UNVISITED) {
                continue; // verdict already memoized by an earlier start
            }
            state[start] = VISITING;
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            while (!stack.isEmpty()) {
                int u = stack.peek();
                if (next[u] < graph[u].length) {
                    int v = graph[u][next[u]];
                    next[u]++;
                    if (state[v] == VISITING) {
                        // Back edge onto the current path: a cycle runs
                        // through it, so this successor is never safe.
                        unsafeChild[u] = true;
                    } else if (state[v] == UNVISITED) {
                        state[v] = VISITING;
                        stack.push(v);
                    } else if (state[v] == UNSAFE) {
                        // Memoized danger feeds straight back.
                        unsafeChild[u] = true;
                    }
                    // A SAFE successor clears the bar on its own.
                } else {
                    stack.pop();
                    state[u] = unsafeChild[u] ? UNSAFE : SAFE;
                    if (unsafeChild[u] && !stack.isEmpty()) {
                        // Danger propagates up: the node below reached it.
                        unsafeChild[stack.peek()] = true;
                    }
                }
            }
        }
        // The ascending scan yields the required sorted order.
        int count = 0;
        for (int i = 0; i < n; i++) {
            if (state[i] == SAFE) {
                count++;
            }
        }
        int[] result = new int[count];
        int idx = 0;
        for (int i = 0; i < n; i++) {
            if (state[i] == SAFE) {
                result[idx++] = i;
            }
        }
        return result;
    }
}
