class Solution {

    public boolean isRobotBounded(String instructions) {
        // simulate one pass from the origin facing north; L/R rotate the
        // heading a quarter turn via (dx, dy) -> (-dy, dx) / (dy, -dx)
        int x = 0,
            y = 0;
        int dx = 0,
            dy = 1; // north
        for (int i = 0; i < instructions.length(); i++) {
            char ch = instructions.charAt(i);
            if (ch == 'G') {
                x += dx;
                y += dy;
            } else if (ch == 'L') {
                int ndx = -dy,
                    ndy = dx;
                dx = ndx;
                dy = ndy;
            } else {
                // 'R'
                int ndx = dy,
                    ndy = -dx;
                dx = ndx;
                dy = ndy;
            }
        }
        // at the origin: each pass is a closed loop. Turned at all: every
        // repetition's displacement is the previous one rotated by a fixed
        // quarter turn, so at most four copies cancel back to the start.
        // Facing north while displaced repeats the same drift — the one
        // unbounded case.
        return (x == 0 && y == 0) || !(dx == 0 && dy == 1);
    }
}
