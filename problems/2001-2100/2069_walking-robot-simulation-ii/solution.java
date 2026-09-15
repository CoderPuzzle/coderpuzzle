class Robot {

    private final int width;
    private final int height;
    private final int perimeter;
    private int index;
    private boolean moved;

    public Robot(int width, int height) {
        this.width = width;
        this.height = height;
        this.perimeter = 2 * (width + height) - 4;
    }

    public void step(int num) {
        index = (index + num) % perimeter;
        moved = true;
    }

    public int[] getPos() {
        if (index <= width - 1) return new int[] { index, 0 };
        int rightEnd = width + height - 2;
        if (index <= rightEnd) return new int[] { width - 1, index - (width - 1) };
        int topEnd = 2 * width + height - 3;
        if (index <= topEnd) return new int[] { topEnd - index, height - 1 };
        return new int[] { 0, perimeter - index };
    }

    public String getDir() {
        if (!moved) return "East";
        if (index == 0) return "South";
        if (index <= width - 1) return "East";
        if (index <= width + height - 2) return "North";
        if (index <= 2 * width + height - 3) return "West";
        return "South";
    }
}
