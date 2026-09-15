class OrderManagementSystem {
  public:
    OrderManagementSystem();
    void addOrder(int orderId, string orderType, int price);
    void modifyOrder(int orderId, int newPrice);
    void cancelOrder(int orderId);
    vector<int> getOrdersAtPrice(string orderType, int price);
};
