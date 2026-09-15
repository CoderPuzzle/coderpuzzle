class Solution {

    public int numberOfCleanRooms(int[][] room) {
        int rows = room.length;
        int cols = room[0].length;
        int[] dr = { 0, 1, 0, -1 };
        int[] dc = { 1, 0, -1, 0 };
        boolean[] seen = new boolean[rows * cols * 4];
        boolean[] cleaned = new boolean[rows * cols];
        int row = 0;
        int col = 0;
        int direction = 0;
        int cleanCount = 0;

        while (!seen[(row * cols + col) * 4 + direction]) {
            seen[(row * cols + col) * 4 + direction] = true;
            int cell = row * cols + col;
            if (!cleaned[cell]) {
                cleaned[cell] = true;
                cleanCount++;
            }

            int nextRow = row + dr[direction];
            int nextCol = col + dc[direction];
            if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols || room[nextRow][nextCol] == 1) {
                direction = (direction + 1) % 4;
            } else {
                row = nextRow;
                col = nextCol;
            }
        }
        return cleanCount;
    }
}
