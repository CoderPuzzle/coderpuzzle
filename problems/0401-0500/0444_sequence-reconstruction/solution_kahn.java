import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public boolean sequenceReconstruction(int[] nums, int[][] sequences) {
        // Read the sequences as a precedence graph: each consecutive pair pins
        // u before v, and the shortest supersequences are exactly the
        // permutations of [1, n] respecting every pinned pair. Kahn's algorithm
        // peels the graph's sources in order; the order is forced exactly when
        // there is never more than one source to pick from.
        int n = nums.length;
        for (int[] seq : sequences) {
            for (int x : seq) {
                // A value outside [1, n] cannot occur in nums at all, so nums
                // is not even a supersequence.
                if (x < 1 || x > n) {
                    return false;
                }
            }
        }
        List<List<Integer>> successors = new ArrayList<>();
        for (int x = 0; x <= n; ++x) {
            successors.add(new ArrayList<>());
        }
        int[] unpinned = new int[n + 1];
        for (int[] seq : sequences) {
            for (int j = 0; j + 1 < seq.length; ++j) {
                int u = seq[j],
                    v = seq[j + 1];
                // A repeated pair only pads v's count; every copy is discharged
                // together when u is picked, so multiplicity is harmless. A
                // pair pinned to one value never discharges and reads as a loop.
                successors.get(u).add(v);
                ++unpinned[v];
            }
        }
        // The free values are the ones with no unpinned predecessor left: two
        // at once could each come next, none means the pairs loop.
        Deque<Integer> free = new ArrayDeque<>();
        for (int x = 1; x <= n; ++x) {
            if (unpinned[x] == 0) {
                free.add(x);
            }
        }
        for (int want : nums) {
            if (free.size() != 1) {
                return false;
            }
            int u = free.poll();
            // The forced next value must be nums's own next value.
            if (u != want) {
                return false;
            }
            for (int v : successors.get(u)) {
                if (--unpinned[v] == 0) {
                    free.add(v);
                }
            }
        }
        return true;
    }
}
