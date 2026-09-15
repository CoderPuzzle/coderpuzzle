import java.util.ArrayDeque;
import java.util.Queue;

class Solution {

    public long maxCandies(int[] status, int[] candies, int[][] keys, int[][] containedBoxes, int[] initialBoxes) {
        // Two waiting rooms: owned-but-locked boxes, and the openable queue.
        boolean[] lockedHeld = new boolean[status.length];
        boolean[] opened = new boolean[status.length];
        long total = 0;
        Queue<Integer> queue = new ArrayDeque<>();

        for (int b : initialBoxes) acquire(b, status, opened, lockedHeld, queue);

        while (!queue.isEmpty()) {
            int b = queue.poll();
            if (opened[b]) continue;
            opened[b] = true;
            total += candies[b];
            for (int k : keys[b]) {
                status[k] = 1;
                if (lockedHeld[k]) {
                    // The key only matters for a box already owned and
                    // parked; release it into the queue once it unlocks.
                    lockedHeld[k] = false;
                    queue.add(k);
                }
            }
            for (int c : containedBoxes[b]) {
                acquire(c, status, opened, lockedHeld, queue);
            }
        }
        return total;
    }

    private void acquire(int box, int[] status, boolean[] opened, boolean[] lockedHeld, Queue<Integer> queue) {
        // Ownership event: an initial box, or one found inside another.
        if (opened[box] || lockedHeld[box]) return;
        if (status[box] == 1) {
            queue.add(box);
        } else {
            lockedHeld[box] = true;
        }
    }
}
