#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    int prefixConnected(vector<string> &words, int k) {
        // Sharing the first k characters is transitive, so each connected
        // group is exactly one k-prefix and counting groups of size >= 2
        // is counting prefixes that occur at least twice.
        unordered_map<string, int> counts;
        for (const string &word : words) {
            if ((int)word.size() >= k) {
                counts[word.substr(0, k)]++;
            }
        }
        // A group needs at least two words, so prefixes seen once do not
        // count; the answer is at most n <= 5000, exact in an int.
        int groups = 0;
        for (const auto &entry : counts) {
            if (entry.second >= 2) {
                groups++;
            }
        }
        return groups;
    }
};
