class Solution {
  public:
    bool checkOverlap(int radius, int xCenter, int yCenter, int x1, int y1, int x2, int y2) {
        // The nearest point of an axis-aligned box to any point is found
        // coordinate-wise: clamp each coordinate into the box's interval.
        int nearest_x = max(x1, min(xCenter, x2));
        int nearest_y = max(y1, min(yCenter, y2));
        int dx = xCenter - nearest_x;
        int dy = yCenter - nearest_y;
        return dx * dx + dy * dy <= radius * radius;
    }
};
