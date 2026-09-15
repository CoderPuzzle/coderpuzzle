class Solution {

    public String crackSafe(int n, int k) {
        // Iterative Hierholzer over the de Bruijn graph: nodes are (n-1)-digit
        // strings (as base-k integers), edges are the k^n passwords. Digits are
        // tried in ascending order, matching the reference's deterministic walk.
        long total = 1;
        for (int i = 0; i < n; i++) total *= k;
        long shift = 1;
        for (int i = 0; i < n - 1; i++) shift *= k;
        boolean[] seen = new boolean[(int) total];
        StringBuilder out = new StringBuilder();
        long[] nodeStack = new long[(int) total + 1];
        int[] digitStack = new int[(int) total + 1]; // digit used to enter each stacked node
        int top = 0;
        nodeStack[0] = 0;
        digitStack[0] = 0;
        while (top >= 0) {
            long node = nodeStack[top];
            int nxt = -1;
            for (int x = 0; x < k; x++) {
                int e = (int) (node * k + x);
                if (!seen[e]) {
                    seen[e] = true;
                    nxt = x;
                    break;
                }
            }
            if (nxt >= 0) {
                top++;
                nodeStack[top] = (node * k + nxt) % shift;
                digitStack[top] = nxt;
            } else {
                int d = digitStack[top];
                top--;
                if (top >= 0) {
                    out.append((char) ('0' + d));
                }
            }
        }
        StringBuilder suffix = new StringBuilder();
        for (int i = 0; i < n - 1; i++) suffix.append('0');
        return out.append(suffix).toString();
    }
}
