class Solution {

    public boolean isThereAPath(int[][] grid) {
        // Monotone moves give cell (i, j) exactly i + j + 1 visited
        // cells, so every balance (#1s - #0s) reachable there lies
        // inside [-(m+n-1), m+n-1] — a window of up to 399 values, one
        // bit per balance packed into 64-bit words. Each column carries
        // such a word-set for the current row; a cell unions its top and
        // left neighbour sets and shifts the whole set by its own value.
        // Balance 0 surviving at the bottom-right corner is the answer.
        int m = grid.length;
        int n = grid[0].length;
        int half = m + n - 1;
        int words = (2 * half + 64) / 64;
        long[][] cols = new long[n][words];
        setBit(cols[0], half + (grid[0][0] == 1 ? 1 : -1));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0) continue;
                long[] merged = new long[words];
                if (i > 0) {
                    for (int w = 0; w < words; w++) merged[w] |= cols[j][w];
                }
                if (j > 0) {
                    for (int w = 0; w < words; w++) {
                        merged[w] |= cols[j - 1][w];
                    }
                }
                long[] out = new long[words];
                shift(merged, grid[i][j] == 1, out);
                cols[j] = out;
            }
        }
        return getBit(cols[n - 1], half);
    }

    private void setBit(long[] bits, int index) {
        bits[index >> 6] |= 1L << (index & 63);
    }

    private boolean getBit(long[] bits, int index) {
        return ((bits[index >> 6] >>> (index & 63)) & 1L) != 0;
    }

    private void shift(long[] bits, boolean up, long[] out) {
        if (up) {
            // every balance rises by one: shift the set toward MSB
            long carry = 0;
            for (int w = 0; w < bits.length; w++) {
                out[w] = (bits[w] << 1) | carry;
                carry = bits[w] >>> 63;
            }
        } else {
            // every balance falls by one: shift toward LSB
            long rem = 0;
            for (int w = bits.length - 1; w >= 0; w--) {
                out[w] = (bits[w] >>> 1) | (rem << 63);
                rem = bits[w] & 1L;
            }
        }
    }
}
