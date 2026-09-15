class StatisticsTracker {
  public:
    StatisticsTracker();
    void addNumber(int number);
    void removeFirstAddedNumber();
    int getMean();
    int getMedian();
    int getMode();
};
