class SubrectangleQueries {
  public:
    SubrectangleQueries(vector<vector<long long>> rectangle);
    void updateSubrectangle(int row1, int col1, int row2, int col2, long long newValue);
    long long getValue(int row, int col);
};
