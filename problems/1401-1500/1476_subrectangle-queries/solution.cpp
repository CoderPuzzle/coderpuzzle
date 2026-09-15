#include <vector>

class SubrectangleQueries {
  public:
    SubrectangleQueries(std::vector<std::vector<long long>> rectangle) : rect(std::move(rectangle)) {}

    void updateSubrectangle(int row1, int col1, int row2, int col2, long long newValue) {
        for (int r = row1; r <= row2; ++r) {
            for (int c = col1; c <= col2; ++c) {
                rect[r][c] = newValue;
            }
        }
    }

    long long getValue(int row, int col) { return rect[row][col]; }

  private:
    std::vector<std::vector<long long>> rect;
};
