class Solution {

    public int minDistance(int height, int width, int[] tree, int[] squirrel, int[][] nuts) {
        // Once the first nut is under the tree, every remaining nut is a
        // tree -> nut -> tree round trip, so 2 * dist(nut, tree) is paid no
        // matter what.
        int total = 0;
        int best = Integer.MAX_VALUE;
        for (int[] nut : nuts) {
            int toTree = Math.abs(nut[0] - tree[0]) + Math.abs(nut[1] - tree[1]);
            total += 2 * toTree;
            // Starting with this nut instead swaps one round trip for
            // squirrel -> nut -> tree, changing the total by the detour
            // dist(squirrel, nut) - dist(nut, tree); the best first nut is
            // the one that minimizes it.
            int detour = Math.abs(nut[0] - squirrel[0]) + Math.abs(nut[1] - squirrel[1]) - toTree;
            best = Math.min(best, detour);
        }
        return total + best;
    }
}
