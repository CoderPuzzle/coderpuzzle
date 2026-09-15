import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public int minSplitMerge(int[] nums1, int[] nums2) {
        // Every operation costs exactly one layer, so breadth-first search
        // from nums1 reaches nums2 along a shortest operation sequence; the
        // whole state space holds at most n! <= 720 arrays.
        List<Integer> start = new ArrayList<>();
        List<Integer> goal = new ArrayList<>();
        for (int v : nums1) {
            start.add(v);
        }
        for (int v : nums2) {
            goal.add(v);
        }
        if (start.equals(goal)) {
            return 0;
        }
        int n = start.size();
        Set<List<Integer>> seen = new HashSet<>();
        Deque<List<Integer>> queue = new ArrayDeque<>();
        seen.add(start);
        queue.addLast(start);
        int steps = 0;
        while (!queue.isEmpty()) {
            steps++;
            for (int level = queue.size(); level > 0; level--) {
                List<Integer> state = queue.pollFirst();
                // Cut every subarray [l..r] (single elements included) and
                // paste it at every slot of the remainder.
                for (int l = 0; l < n; l++) {
                    for (int r = l; r < n; r++) {
                        List<Integer> rest = new ArrayList<>(state.subList(0, l));
                        rest.addAll(state.subList(r + 1, n));
                        List<Integer> piece = new ArrayList<>(state.subList(l, r + 1));
                        for (int i = 0; i <= rest.size(); i++) {
                            List<Integer> next = new ArrayList<>(rest.subList(0, i));
                            next.addAll(piece);
                            next.addAll(rest.subList(i, rest.size()));
                            if (next.equals(goal)) {
                                return steps;
                            }
                            if (seen.add(next)) {
                                queue.addLast(next);
                            }
                        }
                    }
                }
            }
        }
        return -1; // unreachable: nums2 is guaranteed to be a permutation
    }
}
