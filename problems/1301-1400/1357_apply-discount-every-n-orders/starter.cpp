class Cashier {
  public:
    Cashier(int n, int discount, vector<int> products, vector<int> prices);
    double getBill(vector<int> product, vector<int> amount);
};
