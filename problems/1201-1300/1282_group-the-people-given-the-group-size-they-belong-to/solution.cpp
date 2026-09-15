#include <unordered_map>
#include <vector>

// Bucket ids by required size, then slice each bucket into chunks of
// exactly that size — the input guarantees each bucket divides evenly.
class Solution {
  public:
    vector<vector<int>> groupThePeople(vector<int> &groupSizes) {
        std::unordered_map<int, vector<int>> buckets;
        for (int person = 0; person < (int)groupSizes.size(); ++person) {
            buckets[groupSizes[person]].push_back(person);
        }
        vector<vector<int>> groups;
        // A valid grouping exists, so every bucket length is a multiple of
        // its size and the slices come out even.
        for (auto &[size, members] : buckets) {
            for (int start = 0; start < (int)members.size(); start += size) {
                groups.emplace_back(members.begin() + start, members.begin() + start + size);
            }
        }
        return groups;
    }
};
