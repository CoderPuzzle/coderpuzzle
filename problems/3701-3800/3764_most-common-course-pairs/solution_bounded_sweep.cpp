#include <algorithm>
#include <array>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

class Solution {
  public:
    std::vector<std::string> mostCommonCoursePair(std::vector<std::vector<std::string>> &completions) {
        // Group rows per student; every student is judged and sorted
        // independently of the rest.
        std::unordered_map<std::string, std::vector<std::array<std::string, 3>>> byStudent;
        for (const auto &row : completions) {
            byStudent[row[0]].push_back({row[2], row[1], row[3]});
        }
        std::unordered_map<std::pair<std::string, std::string>, int, PairHash> counts;
        for (auto &[student, records] : byStudent) {
            (void)student;
            // Qualification without floats: sum >= 4 * n is exactly
            // "average >= 4" over integer ratings.
            int n = (int)records.size();
            if (n < 5) {
                continue;
            }
            int total = 0;
            for (const auto &record : records) {
                total += std::stoi(record[2]);
            }
            if (total < 4 * n) {
                continue;
            }
            // (date, course) sorts chronologically, name-breaking ties.
            std::sort(records.begin(), records.end());
            for (int i = 1; i < n; i++) {
                counts[{records[i - 1][1], records[i][1]}] += 1;
            }
        }
        // The tuple (-count, first, second) totally orders distinct keys, so
        // the running champion is the same pair no matter how the hash table
        // yields its entries.
        const std::pair<std::string, std::string> *bestPair = nullptr;
        int bestCount = -1;
        for (const auto &[pair, count] : counts) {
            bool better = count > bestCount || (count == bestCount && pair < *bestPair);
            if (better) {
                bestCount = count;
                bestPair = &pair;
            }
        }
        if (bestPair == nullptr) {
            return {};
        }
        return {bestPair->first, bestPair->second, std::to_string(bestCount)};
    }

  private:
    struct PairHash {
        std::size_t operator()(const std::pair<std::string, std::string> &p) const {
            return std::hash<std::string>()(p.first) ^ (std::hash<std::string>()(p.second) << 1);
        }
    };
};
