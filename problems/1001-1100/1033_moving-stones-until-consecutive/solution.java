import java.util.Arrays;

class Solution {

    public int[] numMovesStones(int a, int b, int c) {
        // Sort into x <= y <= z so the two gaps (empty slots between
        // neighbors) are easy to read off.
        int[] sorted = { a, b, c };
        Arrays.sort(sorted);
        int x = sorted[0],
            y = sorted[1],
            z = sorted[2];
        if (y - x == 1 && z - y == 1) {
            // No empty slots at all: already consecutive.
            return new int[] { 0, 0 };
        }
        // One move suffices whenever a gap is 0 or 1 stone-width wide,
        // since the far stone can jump straight into what remains.
        int minMoves = y - x <= 2 || z - y <= 2 ? 1 : 2;
        // Every move shrinks the spread z - x by exactly 1 in the best
        // case, and the spread must end at 2 (three consecutive values),
        // so the maximum is the total number of empty slots.
        int maxMoves = z - x - 2;
        return new int[] { minMoves, maxMoves };
    }
}
