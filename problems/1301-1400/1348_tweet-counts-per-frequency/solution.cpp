#include <algorithm>
#include <unordered_map>
#include <vector>

// Per-name sorted time lists; a query slices its window into chunks and
// counts each chunk with two binary searches.
class TweetCounts {
  public:
    TweetCounts() {}

    void recordTweet(std::string tweetName, long long time) {
        auto &list = times_[tweetName];
        auto at = std::upper_bound(list.begin(), list.end(), time);
        list.insert(at, time);
    }

    std::vector<int> getTweetCountsPerFrequency(std::string freq, std::string tweetName, long long startTime,
                                                long long endTime) {
        long long chunk = chunkOf(freq);
        auto it = times_.find(tweetName);
        const std::vector<long long> empty;
        const std::vector<long long> &list = it == times_.end() ? empty : it->second;
        std::vector<int> buckets;
        for (long long lo = startTime; lo <= endTime; lo += chunk) {
            long long hi = std::min(lo + chunk - 1, endTime);
            buckets.push_back((int)(std::upper_bound(list.begin(), list.end(), hi) -
                                    std::upper_bound(list.begin(), list.end(), lo - 1)));
        }
        return buckets;
    }

  private:
    std::unordered_map<std::string, std::vector<long long>> times_;

    static long long chunkOf(const std::string &freq) {
        if (freq == "minute")
            return 60;
        if (freq == "hour")
            return 3600;
        return 86400;
    }
};
