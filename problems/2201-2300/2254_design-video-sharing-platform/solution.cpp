#include <map>
#include <set>
#include <string>
#include <vector>

class VideoSharingPlatform {
  public:
    struct Video {
        std::string content;
        long long likes = 0;
        long long dislikes = 0;
        long long views = 0;
    };

    VideoSharingPlatform() {}

    int upload(string video) {
        int id;
        if (!freeIds.empty()) {
            id = *freeIds.begin();
            freeIds.erase(freeIds.begin());
        } else {
            id = static_cast<int>(videos.size());
        }
        videos.emplace(id, Video{video, 0, 0, 0});
        return id;
    }

    void remove(int videoId) {
        if (videos.erase(videoId) > 0) {
            freeIds.insert(videoId);
        }
    }

    string watch(int videoId, int startMinute, int endMinute) {
        auto it = videos.find(videoId);
        if (it == videos.end()) {
            return "-1";
        }
        Video &video = it->second;
        video.views++;
        int end = min<long long>(endMinute, static_cast<long long>(video.content.size()) - 1);
        return video.content.substr(startMinute, end - startMinute + 1);
    }

    void like(int videoId) {
        auto it = videos.find(videoId);
        if (it != videos.end()) {
            it->second.likes++;
        }
    }

    void dislike(int videoId) {
        auto it = videos.find(videoId);
        if (it != videos.end()) {
            it->second.dislikes++;
        }
    }

    vector<int> getLikesAndDislikes(int videoId) {
        auto it = videos.find(videoId);
        if (it == videos.end()) {
            return {-1};
        }
        return {static_cast<int>(it->second.likes), static_cast<int>(it->second.dislikes)};
    }

    int getViews(int videoId) {
        auto it = videos.find(videoId);
        if (it == videos.end()) {
            return -1;
        }
        return static_cast<int>(it->second.views);
    }

  private:
    std::map<int, Video> videos;
    std::set<int> freeIds;
};
