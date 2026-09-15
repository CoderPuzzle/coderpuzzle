class Solution {
  public:
    int maxHeightOfTriangle(int red, int blue) {
        // Rows are built contiguously from the top with sizes 1, 2, 3, ...,
        // each row single-colored and alternating with its neighbors, so
        // once a row cannot be filled the triangle simply stops there.
        // Simulate both choices of top color with a plain level loop that
        // subtracts each row's size from its side; with at most 200 balls
        // in total the loop runs fewer than 20 levels, well inside int.
        auto height = [](int top, int other) {
            int level = 1;
            while (true) {
                if (level % 2 == 1) {
                    if (top < level) {
                        return level - 1;
                    }
                    top -= level;
                } else {
                    if (other < level) {
                        return level - 1;
                    }
                    other -= level;
                }
                level++;
            }
        };
        return max(height(red, blue), height(blue, red));
    }
};
