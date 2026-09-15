#include <string>
#include <unordered_map>
#include <vector>

using namespace std;

class Solution {
  public:
    long long countPairs(vector<string> &words) {
        // Shifting a word by k adds k to every letter, so two words are
        // similar exactly when subtracting each word's own first letter
        // maps both onto the same normalized key: (c - word[0]) mod 26.
        unordered_map<string, int> counts;
        for (const string &word : words) {
            int base = word[0] - 'a';
            string key;
            key.reserve(word.size());
            for (char c : word) {
                key.push_back(char('a' + (c - 'a' - base + 26) % 26));
            }
            counts[key]++;
        }
        // Pairs live inside one class; n <= 10^5 bounds the total by
        // n(n-1)/2 < 5 * 10^9, so the pair count is a long long.
        long long pairs = 0;
        for (const auto &entry : counts) {
            int c = entry.second;
            pairs += 1LL * c * (c - 1) / 2;
        }
        return pairs;
    }
};
