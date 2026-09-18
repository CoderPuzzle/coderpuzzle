class NumMatrix {
  public:
    NumMatrix(vector<vector<int>> matrix);
    void update(int row, int col, int val);
    long long sumRegion(int row1, int col1, int row2, int col2);
};
