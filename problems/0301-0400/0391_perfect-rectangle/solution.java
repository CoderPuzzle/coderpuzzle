import java.util.HashSet;
import java.util.Set;

class Solution {

    public boolean isRectangleCover(int[][] rectangles) {
        // Two signatures of an exact cover, gathered in one pass: the piece
        // areas must sum to the bounding rectangle's area, and every interior
        // corner cancels, leaving exactly the bounding box's four corners.
        long area = 0;
        int minX = Integer.MAX_VALUE;
        int minY = Integer.MAX_VALUE;
        int maxA = Integer.MIN_VALUE;
        int maxB = Integer.MIN_VALUE;
        Set<Long> corners = new HashSet<>();
        for (int[] rectangle : rectangles) {
            int x = rectangle[0],
                y = rectangle[1],
                a = rectangle[2],
                b = rectangle[3];
            area += (long) (a - x) * (b - y);
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxA = Math.max(maxA, a);
            maxB = Math.max(maxB, b);
            // Toggle: add when absent, remove when present, so a corner
            // shared by 2 or 4 pieces vanishes instead of accumulating.
            toggle(corners, pack(x, y));
            toggle(corners, pack(x, b));
            toggle(corners, pack(a, y));
            toggle(corners, pack(a, b));
        }
        return (
            corners.size() == 4 &&
            corners.contains(pack(minX, minY)) &&
            corners.contains(pack(minX, maxB)) &&
            corners.contains(pack(maxA, minY)) &&
            corners.contains(pack(maxA, maxB)) &&
            area == (long) (maxA - minX) * (maxB - minY)
        );
    }

    private void toggle(Set<Long> corners, long corner) {
        if (!corners.remove(corner)) {
            corners.add(corner);
        }
    }

    // Coordinates fit in 32 bits each, so the pair packs into one long key.
    private long pack(int x, int y) {
        return ((long) x << 32) | (y & 0xffffffffL);
    }
}
