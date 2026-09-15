#include <string>
#include <utility>
#include <vector>

// Logs kept as (id, timestamp) pairs in put order; retrieve truncates every
// string to the granularity's fixed-width prefix and keeps the logs whose
// truncated timestamp compares between the truncated bounds — zero-padded
// fields make that lexicographic compare exact.
class LogSystem {
  public:
    LogSystem() {}

    void put(int id, string timestamp) { logs.push_back({id, timestamp}); }

    vector<int> retrieve(string start, string end, string granularity) {
        int width = prefix_width(granularity);
        const string low = start.substr(0, width);
        const string high = end.substr(0, width);
        vector<int> found;
        for (const auto &[id, timestamp] : logs) {
            // Same-width truncations compare exactly like their fields.
            const string truncated = timestamp.substr(0, width);
            if (low <= truncated && truncated <= high) {
                found.push_back(id);
            }
        }
        return found;
    }

  private:
    vector<pair<int, string>> logs;

    // "2017" for Year; one more ":XX" field per step down to 19.
    int prefix_width(const string &granularity) const {
        if (granularity == "Year") {
            return 4;
        }
        if (granularity == "Month") {
            return 7;
        }
        if (granularity == "Day") {
            return 10;
        }
        if (granularity == "Hour") {
            return 13;
        }
        if (granularity == "Minute") {
            return 16;
        }
        return 19;
    }
};
