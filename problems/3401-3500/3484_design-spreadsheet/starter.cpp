class Spreadsheet {
  public:
    Spreadsheet(int rows);
    void setCell(string cell, int value);
    void resetCell(string cell);
    int getValue(string formula);
};
