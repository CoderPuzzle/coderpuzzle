import java.util.ArrayList;
import java.util.List;

class Solution {

    public boolean circularArrayLoop(int[] nums) {
        int n = nums.length;
        // Every index has exactly one successor, so each walk either closes
        // a loop or dies; 0 unseen, 1 on the current walk, 2 proven dead.
        int[] state = new int[n];
        for (int start = 0; start < n; ++start) {
            if (state[start] != 0) continue;
            List<Integer> path = new ArrayList<>();
            int node = start;
            while (state[node] == 0) {
                state[node] = 1;
                path.add(node);
                int next = (((node + nums[node]) % n) + n) % n;
                // A legal loop keeps one direction and more than one node,
                // so a sign flip or a hop back to self kills this chain.
                if (nums[next] * nums[node] < 0 || next == node) break;
                node = next;
                if (state[node] == 1) return true;
            }
            for (int walked : path) state[walked] = 2;
        }
        return false;
    }
}
