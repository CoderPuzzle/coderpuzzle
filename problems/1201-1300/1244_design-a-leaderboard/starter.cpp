class Leaderboard {
  public:
    Leaderboard();
    void addScore(int playerId, int score);
    long long top(int K);
    void reset(int playerId);
};
