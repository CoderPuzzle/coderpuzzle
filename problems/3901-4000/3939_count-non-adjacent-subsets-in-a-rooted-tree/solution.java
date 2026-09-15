class Solution {

    public int countValidSubsets(int[] parent, int[] nums, int k) {
        long modulus = 1_000_000_007L;
        int n = parent.length;
        java.util.List<Integer>[] children = new java.util.ArrayList[n];
        for (int i = 0; i < n; i++) children[i] = new java.util.ArrayList<>();
        for (int i = 1; i < n; i++) children[parent[i]].add(i);

        long[][] dp0 = new long[n][k];
        long[][] dp1 = new long[n][k];
        for (int node = n - 1; node >= 0; node--) {
            dp0[node][0] = 1;
            dp1[node][nums[node] % k] = 1;
            for (int child : children[node]) {
                long[] merged0 = new long[k];
                long[] merged1 = new long[k];
                for (int r0 = 0; r0 < k; r0++) {
                    long value0 = dp0[node][r0];
                    long value1 = dp1[node][r0];
                    if (value0 == 0 && value1 == 0) continue;
                    for (int r1 = 0; r1 < k; r1++) {
                        long childAny = (dp0[child][r1] + dp1[child][r1]) % modulus;
                        int residue = (r0 + r1) % k;
                        merged0[residue] = (merged0[residue] + value0 * childAny) % modulus;
                        merged1[residue] = (merged1[residue] + value1 * dp0[child][r1]) % modulus;
                    }
                }
                dp0[node] = merged0;
                dp1[node] = merged1;
            }
        }
        return (int) ((dp0[0][0] + dp1[0][0] - 1 + modulus) % modulus);
    }
}
