class UndergroundSystem {
  public:
    UndergroundSystem();
    void checkIn(int id, string stationName, int t);
    void checkOut(int id, string stationName, int t);
    double getAverageTime(string startStation, string endStation);
};
