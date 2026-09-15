class ExamTracker {
  public:
    ExamTracker();
    void record(int time, int score);
    long long totalScore(int startTime, int endTime);
};
