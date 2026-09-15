#include <string>
#include <unordered_map>

// A plain key -> value hash map: no nodes, no per-insert maintenance. insert()
// stores the pair and stops -- the map carries no structure beyond the
// pairs themselves -- and sum() pays for that at query time,
// scanning every stored key and summing the values of those that start
// with the prefix.
class MapSum {
  public:
    MapSum() {}

    void insert(string key, int val) { values[key] = val; }

    int sum(string prefix) {
        long long total = 0;
        for (const auto &entry : values) {
            if (entry.first.compare(0, prefix.size(), prefix) == 0) {
                total += entry.second;
            }
        }
        return (int)total;
    }

  private:
    unordered_map<string, int> values;
};
