import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public int numBusesToDestination(int[][] routes, int source, int target) {
        // Early exits: same stop needs no bus; an endpoint on no route
        // has no path.
        if (source == target) {
            return 0;
        }
        // Map each stop to the routes passing through it.
        Map<Integer, List<Integer>> stopToRoutes = new HashMap<>();
        for (int r = 0; r < routes.length; r++) {
            for (int s : routes[r]) {
                stopToRoutes.computeIfAbsent(s, k -> new ArrayList<>()).add(r);
            }
        }
        if (!stopToRoutes.containsKey(source) || !stopToRoutes.containsKey(target)) {
            return -1;
        }
        Set<Integer> usedRoutes = new HashSet<>();
        Set<Integer> seenStops = new HashSet<>();
        seenStops.add(source);
        Deque<int[]> queue = new ArrayDeque<>();
        queue.add(new int[] { source, 0 });
        while (!queue.isEmpty()) {
            int[] front = queue.poll();
            int stop = front[0];
            int buses = front[1];
            List<Integer> list = stopToRoutes.getOrDefault(stop, new ArrayList<>());
            for (int r : list) {
                // BFS over stops: boarding a route reaches all its
                // stops one level deeper. Expand each route only once
                // ever — re-boarding can only revisit stops already
                // found at an equal or smaller ride count.
                if (usedRoutes.contains(r)) {
                    continue;
                }
                usedRoutes.add(r);
                for (int nxt : routes[r]) {
                    // The target is counted on sight — no need to
                    // enqueue it.
                    if (nxt == target) {
                        return buses + 1;
                    }
                    if (seenStops.add(nxt)) {
                        queue.add(new int[] { nxt, buses + 1 });
                    }
                }
            }
        }
        return -1;
    }
}
