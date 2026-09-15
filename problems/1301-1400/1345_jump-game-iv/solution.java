import java.util.*;

class Solution {

    public int minJumps(int[] arr) {
        int n = arr.length;
        // Start is already the target.
        if (n == 1) {
            return 0;
        }
        // One pass groups indices by value so a node's same-value neighbors
        // cost their group size instead of rescanning the array.
        Map<Integer, List<Integer>> indices = new HashMap<>();
        for (int i = 0; i < n; i++) {
            indices.computeIfAbsent(arr[i], k -> new ArrayList<>()).add(i);
        }
        // BFS over the implicit graph (edges i-1, i+1, same-value) gives the
        // minimum step count; -1 doubles as the visited marker.
        int[] dist = new int[n];
        Arrays.fill(dist, -1);
        dist[0] = 0;
        Deque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int i = queue.poll();
            int d = dist[i] + 1;
            // Remove the group after use: every index in it just became
            // visited at the same distance, so it can never again produce an
            // unvisited neighbor — without this, all-equal arrays go quadratic.
            List<Integer> nexts = indices.remove(arr[i]);
            if (nexts == null) {
                nexts = new ArrayList<>();
            }
            nexts.add(i - 1);
            nexts.add(i + 1);
            for (int j : nexts) {
                // Bounds check filters i-1 < 0 and i+1 >= n.
                if (j >= 0 && j < n && dist[j] == -1) {
                    dist[j] = d;
                    // The search ends the moment the last index is labeled.
                    if (j == n - 1) {
                        return d;
                    }
                    queue.add(j);
                }
            }
        }
        return dist[n - 1];
    }
}
