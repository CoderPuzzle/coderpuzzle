import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numberOfNodes(int n, int[] queries) {
        // Order does not matter -- only how many times each subtree was
        // flipped. A node v's final value is the parity of (flips queried
        // on v) + (flips queried on every ancestor of v), since each such
        // query covers v too. Count queries per label, then sweep labels
        // 1..n passing accumulated flip counts parent -> child; the tree
        // shape guarantees the parent index v / 2 is already finished.
        Map<Integer, Integer> counts = new HashMap<>();
        for (int q : queries) {
            counts.merge(q, 1, Integer::sum);
        }
        int[] flips = new int[n + 1];
        int total = 0;
        for (int v = 1; v <= n; v++) {
            flips[v] = (v >= 2 ? flips[v / 2] : 0) + counts.getOrDefault(v, 0);
            if (flips[v] % 2 == 1) {
                total++;
            }
        }
        return total;
    }
}
