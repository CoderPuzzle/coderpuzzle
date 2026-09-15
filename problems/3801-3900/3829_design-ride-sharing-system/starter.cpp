class RideSharingSystem {
  public:
    RideSharingSystem();
    void addRider(int riderId);
    void addDriver(int driverId);
    vector<int> matchDriverWithRider();
    void cancelRider(int riderId);
};
