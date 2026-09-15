class Robot {
  public:
    Robot(int width, int height)
        : width(width), height(height), perimeter(2 * (width + height) - 4), index(0), moved(false) {}

    void step(int num) {
        index = (index + num) % perimeter;
        moved = true;
    }

    vector<int> getPos() {
        if (index <= width - 1)
            return {index, 0};
        int rightEnd = width + height - 2;
        if (index <= rightEnd)
            return {width - 1, index - (width - 1)};
        int topEnd = 2 * width + height - 3;
        if (index <= topEnd)
            return {topEnd - index, height - 1};
        return {0, perimeter - index};
    }

    string getDir() {
        if (!moved)
            return "East";
        if (index == 0)
            return "South";
        if (index <= width - 1)
            return "East";
        if (index <= width + height - 2)
            return "North";
        if (index <= 2 * width + height - 3)
            return "West";
        return "South";
    }

  private:
    int width;
    int height;
    int perimeter;
    int index;
    bool moved;
};
