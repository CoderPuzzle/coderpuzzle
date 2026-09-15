import java.util.*;

class Solution {

    public boolean possibleBipartition(int n, int[][] dislikes) {
        // Dislike is symmetric, so build an undirected adjacency list: a
        // valid two-group split is exactly a 2-coloring of this graph.
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adjacency.add(new ArrayList<>());
        }
        for (int[] d : dislikes) {
            adjacency.get(d[0]).add(d[1]);
            adjacency.get(d[1]).add(d[0]);
        }

        int[] color = new int[n + 1]; // 0 = uncolored, 1 / -1 = the two groups
        // The dislike graph may be disconnected, so the scan restarts the
        // DFS from every still-uncolored person; each run colors one
        // whole connected component.
        for (int start = 1; start <= n; start++) {
            if (color[start] != 0) {
                continue;
            }
            color[start] = 1;
            // The stack drives a depth-first sweep: pop a person, then
            // push every uncolored neighbor with the opposite color
            // (marking on push); a neighbor already sharing the current
            // color closes an odd cycle, so no split exists.
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            while (!stack.isEmpty()) {
                int person = stack.pop();
                for (int neighbor : adjacency.get(person)) {
                    if (color[neighbor] == 0) {
                        color[neighbor] = -color[person];
                        stack.push(neighbor);
                    } else if (color[neighbor] == color[person]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}
