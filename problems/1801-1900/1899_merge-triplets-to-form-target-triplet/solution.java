class Solution {

    // Drop overshooters; the survivors' componentwise max is the
    // best-reachable triplet.
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        int[] best = new int[3];
        for (int[] t : triplets) {
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                for (int i = 0; i < 3; i++) {
                    best[i] = Math.max(best[i], t[i]);
                }
            }
        }
        return best[0] == target[0] && best[1] == target[1] && best[2] == target[2];
    }
}
