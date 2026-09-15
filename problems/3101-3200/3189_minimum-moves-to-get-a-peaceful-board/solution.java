import java.util.Arrays;

class Solution {

    public int minMoves(int[][] rooks) {
        // Horizontal and vertical moves touch disjoint coordinates, and a
        // peaceful board needs row indices {0..n-1} once each (columns
        // too). So each axis decouples: pair the k-th smallest coordinate
        // of that axis with target index k-1 — rearrangement keeps this
        // optimal. Worst case per axis is n*(n-1)/2 <= 124750, so the sum
        // cannot overflow int.
        int n = rooks.length;
        int[] xs = new int[n];
        int[] ys = new int[n];
        for (int i = 0; i < n; i++) {
            xs[i] = rooks[i][0];
            ys[i] = rooks[i][1];
        }
        Arrays.sort(xs);
        Arrays.sort(ys);
        int moves = 0;
        for (int i = 0; i < n; i++) {
            moves += Math.abs(xs[i] - i) + Math.abs(ys[i] - i);
        }
        return moves;
    }
}
