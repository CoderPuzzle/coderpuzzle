class TweetCounts {
  public:
    TweetCounts();
    void recordTweet(string tweetName, long long time);
    vector<int> getTweetCountsPerFrequency(string freq, string tweetName, long long startTime, long long endTime);
};
