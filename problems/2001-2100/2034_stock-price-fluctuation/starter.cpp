class StockPrice {
  public:
    StockPrice();
    void update(int timestamp, int price);
    int current();
    int maximum();
    int minimum();
};
