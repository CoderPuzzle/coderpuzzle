class Solution {

    public int kthGrammar(int n, int k) {
        // Each symbol expands into a pair in the next row, so position k
        // of row n descends from position (k + 1) / 2 of the row above.
        // The rule 0 -> 01, 1 -> 10 makes the first child of the pair
        // (odd k) copy its parent and the second (even k) invert it, so
        // the value at (n, k) is the root's 0 flipped once for every even
        // index met on the walk k -> (k + 1) / 2 -> ... -> 1.
        int flips = 0;
        while (k > 1) {
            if (k % 2 == 0) {
                flips ^= 1;
            }
            k = (k + 1) / 2;
        }
        return flips;
    }
}
