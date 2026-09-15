#include <algorithm>
#include <queue>
#include <set>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class FileSharing {
  public:
    FileSharing(int m) {}

    int join(std::vector<int> ownedChunks) {
        int uid;
        if (!freed.empty()) {
            uid = freed.top();
            freed.pop();
        } else {
            uid = nextId++;
        }
        chunks[uid] = std::unordered_set<int>(ownedChunks.begin(), ownedChunks.end());
        alive.insert(uid);
        return uid;
    }

    void leave(int userID) {
        chunks.erase(userID);
        alive.erase(userID);
        freed.push(userID);
    }

    std::vector<int> request(int userID, int chunkID) {
        std::vector<int> owners;
        for (int uid : alive) {
            if (chunks[uid].count(chunkID)) {
                owners.push_back(uid);
            }
        }
        std::sort(owners.begin(), owners.end());
        if (!owners.empty()) {
            chunks[userID].insert(chunkID);
        }
        return owners;
    }

  private:
    std::unordered_map<int, std::unordered_set<int>> chunks;
    std::unordered_set<int> alive;
    std::priority_queue<int, std::vector<int>, std::greater<int>> freed;
    int nextId = 1;
};
