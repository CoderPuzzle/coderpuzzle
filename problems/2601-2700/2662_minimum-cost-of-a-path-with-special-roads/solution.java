import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int minimumCost(int[] start, int[] target, int[][] specialRoads) {
        // By hint 1 an optimal route only ever stops at road endpoints (plus
        // start and target): any other intermediate point is dominated by
        // walking straight past it. Build that candidate set deduped, join
        // every pair with a Manhattan-priced walk, add each special road as
        // one directed edge priced at its own cost, and run Dijkstra.
        List<int[]> candidates = new ArrayList<>();
        candidates.add(new int[] { start[0], start[1] });
        candidates.add(new int[] { target[0], target[1] });
        for (int[] road : specialRoads) {
            candidates.add(new int[] { road[0], road[1] });
            candidates.add(new int[] { road[2], road[3] });
        }
        Map<Long, Integer> index = new HashMap<>();
        List<int[]> points = new ArrayList<>();
        for (int[] point : candidates) {
            long k = key(point[0], point[1]);
            if (!index.containsKey(k)) {
                index.put(k, points.size());
                points.add(point);
            }
        }
        int n = points.size();
        int[][] roads = new int[specialRoads.length][];
        for (int i = 0; i < specialRoads.length; i++) {
            int[] road = specialRoads[i];
            roads[i] = new int[] { index.get(key(road[0], road[1])), index.get(key(road[2], road[3])), road[4] };
        }
        final int INF = Integer.MAX_VALUE;
        int[] dist = new int[n];
        boolean[] used = new boolean[n];
        java.util.Arrays.fill(dist, INF);
        dist[index.get(key(start[0], start[1]))] = 0;
        for (int round = 0; round < n; round++) {
            // Nearest unvisited node scan keeps the code heap-free; with at
            // most ~402 candidates the quadratic cost is negligible.
            int u = -1;
            for (int v = 0; v < n; v++) {
                if (!used[v] && (u == -1 || dist[v] < dist[u])) {
                    u = v;
                }
            }
            if (u == -1 || dist[u] == INF) {
                break;
            }
            used[u] = true;
            for (int v = 0; v < n; v++) {
                if (!used[v]) {
                    int walk =
                        dist[u] +
                        Math.abs(points.get(v)[0] - points.get(u)[0]) +
                        Math.abs(points.get(v)[1] - points.get(u)[1]);
                    if (walk < dist[v]) {
                        dist[v] = walk;
                    }
                }
            }
            for (int[] road : roads) {
                if (road[0] == u && dist[u] + road[2] < dist[road[1]]) {
                    dist[road[1]] = dist[u] + road[2];
                }
            }
        }
        return dist[index.get(key(target[0], target[1]))];
    }

    private static long key(int x, int y) {
        return (long) x * 100003L + y;
    }
}
