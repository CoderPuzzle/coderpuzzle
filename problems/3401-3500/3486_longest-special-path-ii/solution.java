import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public int[] longestSpecialPath(int[][] edges, int[] nums) {
        int n = nums.length;
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2] });
            adj[e[1]].add(new int[] { e[0], e[2] });
        }

        int bestLen = 0;
        int bestNodes = 1; // a single node is always a valid special path
        List<Integer> distPath = new ArrayList<>(); // prefix distances per depth
        Map<Integer, Integer> last = new HashMap<>(); // value -> depth of last occurrence
        // Window starts over the current root-to-node path: top keeps every
        // value distinct, second additionally tolerates one repeated value.
        int[] top = { 0 };
        int[] second = { 0 };
        List<Integer> lastRestore = new ArrayList<>();
        List<Integer> topRestore = new ArrayList<>();
        List<Integer> secondRestore = new ArrayList<>();

        // Events: [node, parent, depth, dist, isExit]
        Deque<int[]> st = new ArrayDeque<>();
        st.push(new int[] { 0, -1, 0, 0, 0 });
        while (!st.isEmpty()) {
            int[] ev = st.pop();
            int u = ev[0],
                par = ev[1],
                depth = ev[2],
                d = ev[3];
            if (ev[4] == 1) {
                distPath.remove(distPath.size() - 1);
                int val = nums[u];
                int prevLast = lastRestore.remove(lastRestore.size() - 1);
                if (prevLast >= 0) {
                    last.put(val, prevLast);
                } else {
                    last.remove(val);
                }
                top[0] = topRestore.remove(topRestore.size() - 1);
                second[0] = secondRestore.remove(secondRestore.size() - 1);
                continue;
            }
            // Enter node u.
            distPath.add(d);
            int val = nums[u];
            Integer box = last.get(val);
            int prevLast = box == null ? -1 : box;
            lastRestore.add(prevLast);
            topRestore.add(top[0]);
            secondRestore.add(second[0]);
            if (prevLast >= top[0]) {
                // The repeat enters the all-distinct window: that window can
                // still serve as the one-repeat window.
                second[0] = top[0];
                top[0] = prevLast + 1;
            } else if (prevLast >= second[0]) {
                second[0] = prevLast + 1;
            }
            last.put(val, depth);
            int length = d - distPath.get(second[0]);
            int nodes = depth - second[0] + 1;
            if (length > bestLen) {
                bestLen = length;
                bestNodes = nodes;
            } else if (length == bestLen && nodes < bestNodes) {
                bestNodes = nodes;
            }
            st.push(new int[] { u, par, depth, d, 1 });
            for (int[] vw : adj[u]) {
                if (vw[0] != par) {
                    st.push(new int[] { vw[0], u, depth + 1, d + vw[1], 0 });
                }
            }
        }
        return new int[] { bestLen, bestNodes };
    }
}
