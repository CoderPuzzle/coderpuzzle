import java.util.Arrays;

class Solution {

    public int maxCoins(int[] piles) {
        // Sort ascending. Bob permanently absorbs the n smallest piles
        // (indices 0..n-1); of what's left, you take every other pile
        // starting at index n, and Alice takes the rest.
        Arrays.sort(piles);
        int n = piles.length / 3;
        int total = 0;
        int idx = n;
        for (int i = 0; i < n; i++) {
            total += piles[idx];
            idx += 2;
        }
        return total;
    }
}
