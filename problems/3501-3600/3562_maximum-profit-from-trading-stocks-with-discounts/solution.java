import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxProfit(int n, int[] present, int[] future, int[][] hierarchy, int budget) {
        List<List<Integer>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) children.add(new ArrayList<>());
        for (int[] e : hierarchy) {
            children.get(e[0] - 1).add(e[1] - 1);
        }

        // BFS order lets every node's children finish before the node itself.
        int[] order = new int[n];
        int cnt = 0;
        order[cnt++] = 0;
        for (int i = 0; i < cnt; i++) {
            for (int v : children.get(order[i])) order[cnt++] = v;
        }

        // f[u][b]: best profit in u's subtree within budget b when u's boss did
        // not buy (u pays the full price); g[u][b]: the boss did buy (u may pay
        // half). The discount depends only on the direct boss, so two profiles
        // are enough.
        int[][] f = new int[n][];
        int[][] g = new int[n][];
        for (int idx = n - 1; idx >= 0; idx--) {
            int u = order[idx];
            int[] childF = combine(children.get(u), f, budget);
            int[] childG = combine(children.get(u), g, budget);

            // If u does not buy, its children get no discount, so both tables
            // start from merged childF. Buying switches to childG (children
            // become discount-eligible) at the full or halved cost respectively.
            int[] fu = childF.clone();
            int[] gu = childF.clone();
            int costFull = present[u];
            int costDisc = present[u] / 2;
            int profitFull = future[u] - costFull;
            int profitDisc = future[u] - costDisc;
            for (int b = 0; b <= budget; b++) {
                if (b >= costFull) {
                    int val = childG[b - costFull] + profitFull;
                    if (val > fu[b]) fu[b] = val;
                }
                if (b >= costDisc) {
                    int val = childG[b - costDisc] + profitDisc;
                    if (val > gu[b]) gu[b] = val;
                }
            }
            // Re-apply a prefix maximum after folding in u's own purchase.
            for (int b = 1; b <= budget; b++) {
                if (fu[b] < fu[b - 1]) fu[b] = fu[b - 1];
                if (gu[b] < gu[b - 1]) gu[b] = gu[b - 1];
            }
            f[u] = fu;
            g[u] = gu;
        }
        // The CEO has no boss and therefore never gets a discount.
        return f[0][budget];
    }

    // Knapsack merge of the children's budget profiles: spend t in one child
    // against every budget level b, then a prefix maximum so leftover budget
    // never lowers a value.
    private int[] combine(List<Integer> kids, int[][] tables, int budget) {
        int[] cur = new int[budget + 1];
        for (int child : kids) {
            int[] arr = tables[child];
            int[] nxt = cur.clone();
            for (int b = 0; b <= budget; b++) {
                int cb = cur[b];
                for (int t = 0; t + b <= budget; t++) {
                    int val = cb + arr[t];
                    if (val > nxt[b + t]) nxt[b + t] = val;
                }
            }
            cur = nxt;
            for (int b = 1; b <= budget; b++) {
                if (cur[b] < cur[b - 1]) cur[b] = cur[b - 1];
            }
        }
        return cur;
    }
}
