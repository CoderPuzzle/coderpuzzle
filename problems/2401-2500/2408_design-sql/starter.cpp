class SQL {
  public:
    SQL(vector<string> names, vector<int> columns);
    bool ins(string name, vector<string> row);
    void rmv(string name, int rowId);
    string sel(string name, int rowId, int columnId);
    vector<string> exp(string name);
};
