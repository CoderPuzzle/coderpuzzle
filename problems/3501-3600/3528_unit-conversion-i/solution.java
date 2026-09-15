import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] baseUnitConversions(int[][] conversions) {
        // The conversions form a directed tree rooted at unit 0, so one BFS
        // fixes every answer: a child costs `factor` units per unit of its
        // parent, so its value is the parent's value times the factor. A
        // product reaches (10^9 + 6) * 10^9 ~ 10^18, so the multiply is a
        // long reduced modulo 10^9 + 7 before storing back into the int
        // result. The array-backed queue keeps the walk iterative — a 10^5
        // chain would overflow the stack if this were recursive.
        final int MOD = 1_000_000_007;
        int n = conversions.length + 1;
        List<List<int[]>> children = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            children.add(new ArrayList<>());
        }
        for (int[] edge : conversions) {
            children.get(edge[0]).add(new int[] { edge[1], edge[2] });
        }
        int[] result = new int[n];
        result[0] = 1;
        int[] queue = new int[n];
        int head = 0;
        int tail = 0;
        queue[tail++] = 0;
        while (head < tail) {
            int node = queue[head++];
            for (int[] child : children.get(node)) {
                result[child[0]] = (int) (((long) result[node] * child[1]) % MOD);
                queue[tail++] = child[0];
            }
        }
        return result;
    }
}
