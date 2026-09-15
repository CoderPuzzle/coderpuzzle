import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] countVisitedNodes(int[] edges) {
        int n = edges.length;
        int[] state = new int[n]; // 0 unvisited, 1 on the current path, 2 resolved
        int[] ans = new int[n];

        for (int start = 0; start < n; start++) {
            if (state[start] == 2) continue;
            List<Integer> path = new ArrayList<>();
            int cur = start;
            while (state[cur] == 0) {
                state[cur] = 1;
                path.add(cur);
                cur = edges[cur];
            }
            if (state[cur] == 1) {
                // A cycle was discovered; find its start inside path.
                int cycleStart = path.indexOf(cur);
                int length = path.size() - cycleStart;
                for (int i = cycleStart; i < path.size(); i++) {
                    ans[path.get(i)] = length;
                    state[path.get(i)] = 2;
                }
                for (int depth = 0; depth < cycleStart; depth++) {
                    ans[path.get(depth)] = length + (cycleStart - depth);
                    state[path.get(depth)] = 2;
                }
            } else {
                // path leads into an already-resolved component.
                int base = ans[cur];
                for (int depth = 0; depth < path.size(); depth++) {
                    ans[path.get(depth)] = base + (path.size() - depth);
                    state[path.get(depth)] = 2;
                }
            }
        }
        return ans;
    }
}
