#include <string>
#include <vector>

class Solution {
  public:
    std::vector<int> vowelStrings(std::vector<std::string> &words, std::vector<std::vector<int>> &queries) {
        // Prefix sums over the vowel-string marks: prefix[i+1] counts
        // the strings among words[0..i] that start and end with a vowel,
        // so a query [l, r] costs one subtraction. Counts stay below
        // words size <= 10^5, well inside 32 bits.
        auto isVowel = [](char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; };
        int n = static_cast<int>(words.size());
        std::vector<int> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i) {
            const std::string &w = words[i];
            prefix[i + 1] = prefix[i] + ((isVowel(w.front()) && isVowel(w.back())) ? 1 : 0);
        }
        std::vector<int> ans;
        ans.reserve(queries.size());
        for (const auto &q : queries) {
            ans.push_back(prefix[q[1] + 1] - prefix[q[0]]);
        }
        return ans;
    }
};
