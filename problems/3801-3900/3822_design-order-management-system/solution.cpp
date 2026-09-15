class OrderManagementSystem {
  public:
    // Two maps in lockstep: orders_ maps orderId -> its packed (type,
    // price) key so modify/cancel find the attributes in one lookup, and
    // buckets_ maps the packed key -> the ids at that key, so a query
    // reads exactly its bucket. The key packs the type bit above 30 price
    // bits (price <= 10^9 < 2^30). Queries return sorted ids — the
    // statement frees the order.
    void addOrder(int orderId, string orderType, int price) {
        long long key = keyOf(orderType, price);
        orders_[orderId] = key;
        buckets_[key].insert(orderId);
    }

    void modifyOrder(int orderId, int newPrice) {
        long long oldKey = orders_[orderId];
        buckets_[oldKey].erase(orderId);
        long long newKey = (oldKey & kTypeBit) | newPrice;
        orders_[orderId] = newKey;
        buckets_[newKey].insert(orderId);
    }

    void cancelOrder(int orderId) {
        buckets_[orders_[orderId]].erase(orderId);
        orders_.erase(orderId);
    }

    vector<int> getOrdersAtPrice(string orderType, int price) {
        auto it = buckets_.find(keyOf(orderType, price));
        if (it == buckets_.end())
            return {};
        vector<int> ids(it->second.begin(), it->second.end());
        sort(ids.begin(), ids.end());
        return ids;
    }

  private:
    static constexpr long long kTypeBit = 1LL << 30;

    static long long keyOf(const string &orderType, int price) { return (orderType == "sell" ? kTypeBit : 0) | price; }

    unordered_map<int, long long> orders_;
    unordered_map<long long, unordered_set<int>> buckets_;
};
