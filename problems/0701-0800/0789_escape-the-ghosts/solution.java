class Solution {

    public boolean escapeGhosts(int[][] ghosts, int[] target) {
        // Everyone covers one unit per turn on an empty grid, so travel
        // times are Manhattan distances: the runner needs |target| turns,
        // ghost i needs |ghosts[i] - target| turns to camp the target. A
        // ghost no farther than the runner gets there first (or together)
        // and waits — not an escape. A strictly farther ghost cannot even
        // meet the runner on a beeline: the runner is d - t from the
        // target at turn t, so the triangle inequality would place that
        // ghost within d of the target after all.
        int mine = Math.abs(target[0]) + Math.abs(target[1]);
        for (int[] ghost : ghosts) {
            int theirs = Math.abs(ghost[0] - target[0]) + Math.abs(ghost[1] - target[1]);
            if (theirs <= mine) {
                return false;
            }
        }
        return true;
    }
}
