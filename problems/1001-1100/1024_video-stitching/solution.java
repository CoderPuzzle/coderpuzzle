import java.util.Arrays;

class Solution {

    public int videoStitching(int[][] clips, int time) {
        // Jump-game greedy over clips sorted by start.
        int[][] ordered = clips.clone();
        Arrays.sort(ordered, (a, b) -> a[0] != b[0] ? Integer.compare(a[0], b[0]) : Integer.compare(a[1], b[1]));
        int count = 0;
        int covered = 0;
        int farthest = 0;
        int i = 0;
        int n = ordered.length;
        while (covered < time) {
            // Cursor i never resets: every clip starting at or before `covered`
            // is examined once, tracking the farthest reach it enables.
            while (i < n && ordered[i][0] <= covered) {
                if (ordered[i][1] > farthest) {
                    farthest = ordered[i][1];
                }
                i++;
            }
            // No usable clip reaches past the current coverage: an unbridgeable gap.
            if (farthest == covered) {
                return -1;
            }
            // Take one clip — the farthest-reaching — and jump the frontier.
            covered = farthest;
            count++;
        }
        return count;
    }
}
