class Solution {

    public int[] xorQueries(int[] arr, int[][] queries) {
        int n = arr.length;
        // prefix[t] = XOR of the first t elements (prefix[0] = 0).
        int[] prefix = new int[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] ^ arr[i];
        }
        // Self-inverse XOR telescopes: elements before l appear in both
        // operands and annihilate, leaving exactly arr[l..r] — O(1) per query.
        int[] result = new int[queries.length];
        for (int q = 0; q < queries.length; q++) {
            result[q] = prefix[queries[q][1] + 1] ^ prefix[queries[q][0]];
        }
        return result;
    }
}
