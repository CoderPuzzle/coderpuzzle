class AuctionSystem {
  public:
    // Per item, a lazy-deletion max-heap of (-amount, -userId, seq)
    // entries: the top is the live leader once every stale top has been
    // popped. A seq map names the newest entry per (userId, itemId) pair,
    // so addBid/updateBid just push a newer entry (the old one turns
    // stale by its seq) and removeBid drops the pair. The heap orders by
    // amount first, userId second, which is exactly the stated tie-break.
    void addBid(int userId, int itemId, int bidAmount) { push(userId, itemId, bidAmount); }

    void updateBid(int userId, int itemId, int newAmount) { push(userId, itemId, newAmount); }

    void removeBid(int userId, int itemId) { latest_seq_.erase(key(userId, itemId)); }

    int getHighestBidder(int itemId) {
        auto it = heaps_.find(itemId);
        if (it == heaps_.end())
            return -1;
        auto &heap = it->second;
        while (!heap.empty()) {
            const auto &top = heap.top();
            auto live = latest_seq_.find(key((int)-get<1>(top), itemId));
            if (live != latest_seq_.end() && live->second == get<2>(top))
                return (int)-get<1>(top);
            heap.pop();
        }
        return -1;
    }

  private:
    using Entry = tuple<long long, long long, long long>;

    void push(int userId, int itemId, int amount) {
        latest_seq_[key(userId, itemId)] = ++clock_;
        heaps_[itemId].push({-amount, -userId, clock_});
    }

    static long long key(int userId, int itemId) { return ((long long)userId << 16) | itemId; }

    unordered_map<int, priority_queue<Entry, vector<Entry>, greater<Entry>>> heaps_;
    unordered_map<long long, long long> latest_seq_;
    long long clock_ = 0;
};
