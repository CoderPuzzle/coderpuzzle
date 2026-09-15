class RideSharingSystem {
  public:
    // Two FIFO deques plus a waiting set: riders and drivers queue in
    // arrival order, matchDriverWithRider pairs the two fronts, and
    // cancelRider only unmarks the rider — a later match lazily skips any
    // front rider that is no longer waiting, so cancellation never shifts
    // the queue.
    void addRider(int riderId) {
        riders_.push_back(riderId);
        waiting_.insert(riderId);
    }

    void addDriver(int driverId) { drivers_.push_back(driverId); }

    vector<int> matchDriverWithRider() {
        while (!riders_.empty() && waiting_.count(riders_.front()) == 0)
            riders_.pop_front();
        if (riders_.empty() || drivers_.empty())
            return {-1, -1};
        int riderId = riders_.front();
        riders_.pop_front();
        waiting_.erase(riderId);
        int driverId = drivers_.front();
        drivers_.pop_front();
        return {driverId, riderId};
    }

    void cancelRider(int riderId) { waiting_.erase(riderId); }

  private:
    deque<int> riders_;
    deque<int> drivers_;
    unordered_set<int> waiting_;
};
