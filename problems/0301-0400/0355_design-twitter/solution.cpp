#include <queue>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>

class Twitter {
  public:
    Twitter() {}

    void postTweet(int userId, int messageId) {
        posts[userId].emplace_back(clock, messageId);
        clock++;
    }

    std::vector<int> getNewsFeed(int userId) {
        // Merge the last 10 messages of the user and every followee with
        // a size-10 min-heap keyed on the global timestamp, so only the
        // 10 most recent messages across all sources survive.
        std::unordered_set<int> sources;
        sources.insert(userId);
        auto followed = following.find(userId);
        if (followed != following.end()) {
            sources.insert(followed->second.begin(), followed->second.end());
        }
        std::priority_queue<std::pair<int, int>, std::vector<std::pair<int, int>>, std::greater<>> heap;
        for (int source : sources) {
            auto timeline = posts.find(source);
            if (timeline == posts.end()) {
                continue;
            }
            for (int index = std::max(0, (int)timeline->second.size() - 10); index < (int)timeline->second.size();
                 index++) {
                heap.push(timeline->second[index]);
                if ((int)heap.size() > 10) {
                    heap.pop();
                }
            }
        }
        std::vector<int> feed(heap.size());
        for (int index = (int)feed.size() - 1; index >= 0; index--) {
            feed[index] = heap.top().second;
            heap.pop();
        }
        return feed;
    }

    void follow(int followerId, int followeeId) { following[followerId].insert(followeeId); }

    void unfollow(int followerId, int followeeId) {
        auto found = following.find(followerId);
        if (found != following.end()) {
            found->second.erase(followeeId);
        }
    }

  private:
    // Per-user chronological message lists (newest last) plus follow sets.
    std::unordered_map<int, std::vector<std::pair<int, int>>> posts; // user -> [time, id]
    std::unordered_map<int, std::unordered_set<int>> following;
    int clock = 0;
};
