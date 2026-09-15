import java.util.HashMap;
import java.util.Map;

class Solution {

    public int pathSum(int[] nums) {
        // The first two digits of each code are the node's (depth, position);
        // keying a map by them turns the array into the tree itself. A node
        // is a leaf exactly when neither child position exists one level
        // down, and a child at (d, p) hangs from the parent at
        // (d - 1, (p + 1) / 2), so each leaf, walked up to the root,
        // accumulates its whole path.
        Map<Integer, Integer> tree = new HashMap<>();
        for (int code : nums) {
            tree.put(code / 10, code % 10);
        }
        int total = 0;
        for (int code : nums) {
            int d = code / 100,
                p = (code / 10) % 10;
            int left = (d + 1) * 10 + 2 * p - 1;
            if (tree.containsKey(left) || tree.containsKey(left + 1)) {
                continue;
            }
            while (d > 0) {
                total += tree.get(d * 10 + p);
                p = (p + 1) / 2;
                d--;
            }
        }
        return total;
    }
}
