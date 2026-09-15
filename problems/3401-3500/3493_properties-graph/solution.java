import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    // intersect() counts DISTINCT shared integers, so each row first
    // collapses to a set: [1, 1] and [1, 1] share only the value 1.
    // Pairwise set intersections then spell out the edges, and an iterative
    // stack DFS counts the components.
    public int numberOfComponents(int[][] properties, int k) {
        int n = properties.length;
        List<Set<Integer>> sets = new ArrayList<>();
        for (int[] row : properties) {
            Set<Integer> values = new HashSet<>();
            for (int value : row) values.add(value);
            sets.add(values);
        }
        List<List<Integer>> adjacency = new ArrayList<>();
        for (int i = 0; i < n; ++i) adjacency.add(new ArrayList<>());
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                Set<Integer> smaller = sets.get(i).size() <= sets.get(j).size() ? sets.get(i) : sets.get(j);
                int shared = 0;
                for (int value : smaller) {
                    if (sets.get(i).contains(value) && sets.get(j).contains(value)) ++shared;
                }
                if (shared >= k) {
                    adjacency.get(i).add(j);
                    adjacency.get(j).add(i);
                }
            }
        }
        boolean[] seen = new boolean[n];
        int components = 0;
        int[] stack = new int[n];
        for (int start = 0; start < n; ++start) {
            if (seen[start]) continue;
            ++components;
            // Mark on push so a node never enters the stack twice.
            seen[start] = true;
            int top = 0;
            stack[top++] = start;
            while (top > 0) {
                int node = stack[--top];
                for (int neighbor : adjacency.get(node)) {
                    if (!seen[neighbor]) {
                        seen[neighbor] = true;
                        stack[top++] = neighbor;
                    }
                }
            }
        }
        return components;
    }
}
