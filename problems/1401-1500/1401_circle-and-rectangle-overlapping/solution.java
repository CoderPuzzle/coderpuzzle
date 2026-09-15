class Solution {

    public boolean checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {
        // The nearest point of an axis-aligned box to any point is found
        // coordinate-wise: clamp each coordinate into the box's interval.
        int nearestX = Math.max(x1, Math.min(xCenter, x2));
        int nearestY = Math.max(y1, Math.min(yCenter, y2));
        int dx = xCenter - nearestX;
        int dy = yCenter - nearestY;
        return dx * dx + dy * dy <= radius * radius;
    }
}
