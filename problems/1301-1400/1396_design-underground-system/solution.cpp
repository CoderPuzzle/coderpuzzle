#include <map>
#include <string>
#include <unordered_map>
#include <utility>

class UndergroundSystem {
  public:
    UndergroundSystem() = default;

    void checkIn(int id, std::string stop, int t) { checkins[id] = {std::move(stop), t}; }

    void checkOut(int id, std::string stop, int t) {
        auto start = checkins.find(id);
        std::string from = std::move(start->second.first);
        long long duration = (long long)t - start->second.second;
        checkins.erase(start);
        auto &bucket = totals[{std::move(from), std::move(stop)}];
        bucket.first += duration;
        bucket.second += 1;
    }

    double getAverageTime(std::string fromStop, std::string toStop) {
        const auto &bucket = totals.at({std::move(fromStop), std::move(toStop)});
        return (double)bucket.first / bucket.second;
    }

  private:
    std::unordered_map<int, std::pair<std::string, int>> checkins;
    std::map<std::pair<std::string, std::string>, std::pair<long long, long long>> totals;
};
