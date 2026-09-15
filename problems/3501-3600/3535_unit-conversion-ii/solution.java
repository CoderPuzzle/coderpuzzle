import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] queryConversions(int[][] conversions, int[][] queries) {
        int mod = 1_000_000_007;
        int n = conversions.length + 1;
        // The edges form a tree rooted at unit 0. fromRoot[u] is the number
        // of units of type u equivalent to one unit of type 0: the residue
        // of the product of factors along the path from the root. Residues
        // stay below 2^30, but products reach 2^60, so widen to long.
        List<List<int[]>> children = new ArrayList<>();
        for (int u = 0; u < n; ++u) {
            children.add(new ArrayList<>());
        }
        for (int[] edge : conversions) {
            children.get(edge[0]).add(new int[] { edge[1], edge[2] });
        }
        long[] fromRoot = new long[n];
        int[] stack = new int[n];
        int top = 0;
        stack[top++] = 0;
        fromRoot[0] = 1;
        while (top > 0) {
            int unit = stack[--top];
            for (int[] edge : children.get(unit)) {
                int child = edge[0];
                long factor = edge[1];
                fromRoot[child] = (fromRoot[unit] * factor) % mod;
                stack[top++] = child;
            }
        }
        // 1 unit of type a equals fromRoot[b] / fromRoot[a] units of type b.
        // Every factor is < mod, so no residue is 0 and the Fermat inverse
        // always exists.
        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; ++q) {
            int a = queries[q][0];
            int b = queries[q][1];
            answer[q] = (int) ((fromRoot[b] * power(fromRoot[a], mod - 2, mod)) % mod);
        }
        return answer;
    }

    private long power(long value, long exponent, int mod) {
        long result = 1;
        while (exponent > 0) {
            if ((exponent & 1) == 1) {
                result = (result * value) % mod;
            }
            value = (value * value) % mod;
            exponent >>= 1;
        }
        return result;
    }
}
