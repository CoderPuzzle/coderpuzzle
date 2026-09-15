class Excel {
  public:
    Excel(int height, string width);
    void set(int row, string column, int val);
    int get(int row, string column);
    int sum(int row, string column, vector<string> numbers);
};
