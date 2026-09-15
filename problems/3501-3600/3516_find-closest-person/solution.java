class Solution {

    public int findClosest(int x, int y, int z) {
        // Same speed means arrival order is just distance order, so compare
        // the two absolute distances to the stationary Person 3.
        int dx = Math.abs(x - z);
        int dy = Math.abs(y - z);
        if (dx < dy) return 1;
        if (dy < dx) return 2;
        return 0;
    }
}
