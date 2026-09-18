class MovieRentingSystem {
  public:
    MovieRentingSystem(int n, vector<vector<int>> entries);
    vector<int> search(int movie);
    void rent(int shop, int movie);
    void drop(int shop, int movie);
    vector<vector<int>> report();
};
