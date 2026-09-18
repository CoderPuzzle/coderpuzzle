class Router {
  public:
    Router(int memoryLimit);
    bool addPacket(int source, int destination, int timestamp);
    vector<int> forwardPacket();
    int getCount(int destination, int startTime, int endTime);
};
