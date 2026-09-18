#include <string>
#include <unordered_map>
#include <vector>

class TimeMap {
  public:
    TimeMap() = default;

    void set(std::string key, std::string value, int timestamp) {
        values[key].push_back(std::move(value));
        stamps[key].push_back(timestamp);
    }

    std::string get(std::string key, int timestamp) {
        auto found = stamps.find(key);
        if (found == stamps.end()) {
            return "";
        }
        const std::vector<int> &history = found->second;
        int low = 0;
        int high = (int)history.size();
        while (low < high) {
            int mid = low + (high - low) / 2;
            if (history[mid] <= timestamp) {
                low = mid + 1;
            } else {
                high = mid;
            }
        }
        int index = low - 1;
        return index < 0 ? "" : values[key][index];
    }

  private:
    std::unordered_map<std::string, std::vector<std::string>> values;
    std::unordered_map<std::string, std::vector<int>> stamps;
};
