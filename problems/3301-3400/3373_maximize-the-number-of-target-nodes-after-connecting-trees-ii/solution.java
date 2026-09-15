import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] maxTargetNodes(int[][] edges1, int[][] edges2) {
        // In a tree, distance parity is the difference of depth parities,
        // so the nodes target to u are exactly u's own bipartition class
        // and a second-tree node v contributes its opposite class. One
        // iterative BFS per tree (a 1e5-node path would overflow the
        // judged -Xss512k stack) labels each node's parity and sizes both
        // classes: answer[i] is tree 1's class size at i's parity, plus
        // tree 2's larger class — the maximum opposite-class count over
        // every connection node, identical for every i.
        int[] counts2 = classify(edges2);
        int best2 = Math.max(counts2[0], counts2[1]);
        int[] counts1 = classify(edges1);
        int n = counts1.length - 2;
        int[] answer = new int[n];
        for (int u = 0; u < n; u++) {
            answer[u] = (counts1[u + 2] == 0 ? counts1[0] : counts1[1]) + best2;
        }
        return answer;
    }

    // Slots 0/1 hold the two depth-parity class sizes, slots 2.. hold
    // each node's depth parity. Pointer-queue BFS — iterative, so deep
    // paths cannot overflow the stack.
    private int[] classify(int[][] edges) {
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        int[] res = new int[n + 2];
        int[] parity = new int[n];
        Arrays.fill(parity, -1);
        parity[0] = 0;
        res[0] = 1;
        int[] queue = new int[n];
        queue[0] = 0;
        int head = 0;
        int tail = 1;
        while (head < tail) {
            int u = queue[head++];
            for (int w : adj.get(u)) {
                if (parity[w] < 0) {
                    parity[w] = parity[u] ^ 1;
                    res[parity[w]]++;
                    queue[tail++] = w;
                }
            }
        }
        System.arraycopy(parity, 0, res, 2, n);
        return res;
    }
}
