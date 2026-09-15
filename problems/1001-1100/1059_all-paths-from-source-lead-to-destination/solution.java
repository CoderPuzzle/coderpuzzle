import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    private static final int WHITE = 0;
    private static final int GRAY = 1;
    private static final int BLACK = 2;

    public boolean leadsToDestination(int n, int[][] edges, int source, int destination) {
        List<Integer>[] graph = new ArrayList[n];
        for (int node = 0; node < n; node++) {
            graph[node] = new ArrayList<>();
        }
        for (int[] edge : edges) {
            graph[edge[0]].add(edge[1]);
        }

        // 0 = unvisited (white), 1 = on the current DFS path (gray), 2 = fully
        // verified safe (black). A node is a leaf when it has no outgoing
        // edges; a leaf is safe only if it is the destination. The
        // destination itself must also be a true leaf -- if it has outgoing
        // edges, any path through it keeps going and can only end somewhere
        // else (or loop forever), so it is unsafe the moment it is reached.
        int[] state = new int[n];

        Boolean verdict = leafVerdict(graph, source, destination);
        if (verdict != null) {
            return verdict;
        }

        // Explicit stack of [node, next child index] frames -- an iterative
        // post-order DFS so the recursion depth never depends on graph depth.
        state[source] = GRAY;
        Deque<int[]> stack = new ArrayDeque<>();
        stack.push(new int[] { source, 0 });
        while (!stack.isEmpty()) {
            int[] frame = stack.peek();
            int node = frame[0];
            int idx = frame[1];
            if (idx == graph[node].size()) {
                state[node] = BLACK;
                stack.pop();
                continue;
            }
            frame[1]++;
            int neighbor = graph[node].get(idx);
            if (state[neighbor] == GRAY) {
                return false; // back edge to a node on the current path: a cycle
            }
            if (state[neighbor] == BLACK) {
                continue; // already proven safe on an earlier branch
            }
            verdict = leafVerdict(graph, neighbor, destination);
            if (verdict != null) {
                if (!verdict) {
                    return false;
                }
                state[neighbor] = BLACK;
                continue;
            }
            state[neighbor] = GRAY;
            stack.push(new int[] { neighbor, 0 });
        }
        return true;
    }

    // Returns a decided verdict for a leaf or for the destination itself;
    // null means the node needs a full DFS expansion before it is decided.
    private Boolean leafVerdict(List<Integer>[] graph, int node, int destination) {
        if (graph[node].isEmpty()) {
            return node == destination;
        }
        if (node == destination) {
            return false;
        }
        return null;
    }
}
