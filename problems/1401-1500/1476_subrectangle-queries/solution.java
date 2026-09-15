class SubrectangleQueries {

    private final long[][] rect;

    public SubrectangleQueries(long[][] rectangle) {
        rect = new long[rectangle.length][];
        for (int r = 0; r < rectangle.length; r++) {
            rect[r] = rectangle[r].clone();
        }
    }

    public void updateSubrectangle(int row1, int col1, int row2, int col2, long newValue) {
        for (int r = row1; r <= row2; r++) {
            long[] row = rect[r];
            for (int c = col1; c <= col2; c++) {
                row[c] = newValue;
            }
        }
    }

    public long getValue(int row, int col) {
        return rect[row][col];
    }
}
