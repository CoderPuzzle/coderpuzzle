import java.util.ArrayList;
import java.util.List;

class Solution {

    public int deleteTreeNodes(int nodes, int[] parent, int[] value) {
        // Fold bottom-up: each node hands its parent its subtree sum and
        // the number of kept nodes below it — but only if its own subtree
        // sum survived as nonzero. A zero-sum subtree contributes nothing
        // to either, which is exactly the cascade: its values stop counting
        // toward every ancestor's sum too.
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < nodes; i++) {
            children.add(new ArrayList<>());
        }
        for (int i = 0; i < nodes; i++) {
            if (parent[i] >= 0) {
                children.get(parent[i]).add(i);
            }
        }
        int[] order = new int[nodes];
        int head = 0;
        int tail = 0;
        order[tail++] = 0;
        while (head < tail) {
            int node = order[head++];
            for (int child : children.get(node)) {
                order[tail++] = child;
            }
        }
        long[] subSum = new long[nodes];
        int[] kept = new int[nodes];
        for (int i = 0; i < nodes; i++) {
            subSum[i] = value[i];
            kept[i] = 1;
        }
        for (int i = nodes - 1; i >= 0; i--) {
            int node = order[i];
            int p = parent[node];
            if (p >= 0 && subSum[node] != 0) {
                subSum[p] += subSum[node];
                kept[p] += kept[node];
            }
        }
        return subSum[0] != 0 ? kept[0] : 0;
    }
}
