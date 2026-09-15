class Solution {

    private int[] masks;
    private int n;
    private int best;

    public int maxLength(String[] arr) {
        n = arr.length;
        // A concatenation is fully described by which of the 26 letters it
        // holds, so each string becomes a bitmask; a self-repeating string
        // (mask -1) can never join a valid combination and is skipped later.
        masks = new int[n];
        for (int i = 0; i < n; i++) {
            int mask = 0;
            boolean bad = false;
            for (char ch : arr[i].toCharArray()) {
                int bit = 1 << (ch - 'a');
                if ((mask & bit) != 0) {
                    bad = true;
                    break;
                }
                mask |= bit;
            }
            masks[i] = bad ? -1 : mask;
        }
        best = 0;
        dfs(0, 0);
        return best;
    }

    private void dfs(int index, int used) {
        // The combination length is just the popcount of its mask.
        int total = Integer.bitCount(used);
        if (total > best) best = total;
        // The start index only moves forward: each subsequence is tried
        // once in index order (length is order-independent). Compatible
        // strings are exactly those whose mask ANDs with `used` to zero.
        for (int j = index; j < n; j++) {
            if (masks[j] != -1 && (used & masks[j]) == 0) {
                dfs(j + 1, used | masks[j]);
            }
        }
    }
}
