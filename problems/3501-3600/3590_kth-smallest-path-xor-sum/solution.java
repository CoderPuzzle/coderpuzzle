import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Deque;
import java.util.List;

class Solution {

    public int[] kthSmallest(int[] par, int[] vals, int[][] queries) {
        // Path XOR root -> node, then bottom-up small-to-large merging of
        // sorted distinct XOR lists: a subtree's list is its largest
        // child's list (reused) grown by the node's own value and every
        // other child's distinct values, so each element only moves into
        // lists that keep doubling. A small child (under 64 values)
        // splices element-by-element — binary search plus one contiguous
        // insert — while a large child folds in with a single two-pointer
        // pass that dedupes as it goes. Queries are grouped by node and
        // answered by indexing the final list at k - 1, or -1 past the
        // end. The tree can be a 5 * 10^4-node chain, so the DFS is an
        // explicit stack.
        int n = vals.length;
        List<List<Integer>> children = new ArrayList<>();
        for (int node = 0; node < n; node++) children.add(new ArrayList<>());
        for (int node = 1; node < n; node++) children.get(par[node]).add(node);
        int[] order = new int[n]; // preorder: every parent precedes its children
        int[] path = new int[n];
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        int count = 0;
        while (!stack.isEmpty()) {
            int node = stack.pop();
            order[count++] = node;
            path[node] = vals[node] ^ (node > 0 ? path[par[node]] : 0);
            for (int child : children.get(node)) stack.push(child);
        }
        List<List<int[]>> byNode = new ArrayList<>(); // node -> {k, query index}
        for (int node = 0; node < n; node++) byNode.add(new ArrayList<>());
        for (int j = 0; j < queries.length; j++) {
            byNode.get(queries[j][0]).add(new int[] { queries[j][1], j });
        }
        int[] answers = new int[queries.length];
        int[][] lists = new int[n][];
        for (int t = n - 1; t >= 0; t--) {
            int node = order[t];
            List<Integer> kids = children.get(node);
            int base = -1;
            for (int child : kids) {
                if (base < 0 || lists[child].length > lists[base].length) base = child;
            }
            int[] acc = base >= 0 ? lists[base] : new int[0];
            int own = path[node];
            int ownPos = Arrays.binarySearch(acc, own);
            if (ownPos < 0) {
                ownPos = -(ownPos + 1);
                acc = insertAt(acc, ownPos, own);
            }
            for (int child : kids) {
                if (child == base) continue;
                int[] small = lists[child];
                if (small.length >= 64) {
                    int[] merged = new int[acc.length + small.length]; // two-pointer pass
                    int i = 0,
                        j = 0,
                        m = 0;
                    while (i < acc.length && j < small.length) {
                        if (acc[i] < small[j]) merged[m++] = acc[i++];
                        else if (small[j] < acc[i]) merged[m++] = small[j++];
                        else {
                            merged[m++] = acc[i++];
                            j++;
                        }
                    }
                    while (i < acc.length) merged[m++] = acc[i++];
                    while (j < small.length) merged[m++] = small[j++];
                    acc = m == merged.length ? merged : Arrays.copyOf(merged, m);
                } else {
                    for (int value : small) {
                        int pos = Arrays.binarySearch(acc, value);
                        if (pos < 0) acc = insertAt(acc, -(pos + 1), value);
                    }
                }
            }
            lists[node] = acc;
            for (int[] q : byNode.get(node)) {
                answers[q[1]] = q[0] <= acc.length ? acc[q[0] - 1] : -1;
            }
        }
        return answers;
    }

    private int[] insertAt(int[] acc, int pos, int value) {
        int[] grown = new int[acc.length + 1];
        System.arraycopy(acc, 0, grown, 0, pos);
        grown[pos] = value;
        System.arraycopy(acc, pos, grown, pos + 1, acc.length - pos);
        return grown;
    }
}
