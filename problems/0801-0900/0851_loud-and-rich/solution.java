import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] loudAndRich(int[][] richer, int[] quiet) {
        // Each pair [a, b] is an edge from a richer person to a poorer one,
        // so the people definitely at least as rich as x are x plus all its
        // ancestors in the DAG. A Kahn sweep settles persons from the
        // known-richest downward: once every richer neighbor of b has
        // relaxed its answer into b, answer[b] holds the least quiet person
        // among them all.
        int n = quiet.length;
        List<List<Integer>> poorer = new ArrayList<>(n);
        for (int x = 0; x < n; ++x) {
            poorer.add(new ArrayList<>());
        }
        int[] pending = new int[n];
        for (int[] pair : richer) {
            poorer.get(pair[0]).add(pair[1]);
            ++pending[pair[1]];
        }
        int[] answer = new int[n];
        for (int x = 0; x < n; ++x) {
            answer[x] = x;
        }
        Deque<Integer> settled = new ArrayDeque<>();
        for (int x = 0; x < n; ++x) {
            if (pending[x] == 0) {
                settled.add(x);
            }
        }
        while (!settled.isEmpty()) {
            int x = settled.poll();
            for (int b : poorer.get(x)) {
                if (quiet[answer[x]] < quiet[answer[b]]) {
                    answer[b] = answer[x];
                }
                if (--pending[b] == 0) {
                    settled.add(b);
                }
            }
        }
        return answer;
    }
}
