class Solution {

    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        // Flood exactly the pixels 4-directionally connected to the seed
        // that still carry the seed's ORIGINAL color. Iterating with an
        // explicit queue is the point — a serpentine component at the
        // bound chains thousands of cells deep, far past any call stack a
        // submission is granted.
        int m = image.length;
        int n = image[0].length;
        int original = image[sr][sc];
        if (original == color) {
            // Recoloring to the color already there changes nothing, and
            // it would erase the distinction the loop below relies on.
            return image;
        }
        // Cells packed as r * n + c in one flat queue; writing the new
        // color as a cell enters it is both the fill and the seen-mark.
        int[] queue = new int[m * n];
        int tail = 0;
        int head = 0;
        image[sr][sc] = color;
        queue[tail++] = sr * n + sc;
        while (head < tail) {
            int cell = queue[head++];
            int r = cell / n;
            int c = cell % n;
            if (r > 0 && image[r - 1][c] == original) {
                image[r - 1][c] = color;
                queue[tail++] = cell - n;
            }
            if (r + 1 < m && image[r + 1][c] == original) {
                image[r + 1][c] = color;
                queue[tail++] = cell + n;
            }
            if (c > 0 && image[r][c - 1] == original) {
                image[r][c - 1] = color;
                queue[tail++] = cell - 1;
            }
            if (c + 1 < n && image[r][c + 1] == original) {
                image[r][c + 1] = color;
                queue[tail++] = cell + 1;
            }
        }
        return image;
    }
}
