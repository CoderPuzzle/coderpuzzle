class Solution {

    public int houseOfCards(int n) {
        // Rows shrink going up; a row of k triangles costs 3k - 1 cards.
        // Memoized recursion over (cards left, largest row allowed above).
        Integer[][] memo = new Integer[n + 1][n + 2];
        return count(n, n, memo);
    }

    private int count(int remaining, int allowed, Integer[][] memo) {
        if (memo[remaining][allowed] != null) {
            return memo[remaining][allowed];
        }
        long total = 0;
        for (int k = 1; k <= allowed && 3 * k - 1 <= remaining; ++k) {
            int used = 3 * k - 1;
            if (used == remaining) {
                total += 1;
            } else {
                total += count(remaining - used, k - 1, memo);
            }
        }
        total %= 1_000_000_007L;
        memo[remaining][allowed] = (int) total;
        return (int) total;
    }
}
