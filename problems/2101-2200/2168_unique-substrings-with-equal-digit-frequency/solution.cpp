#include <string>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int equalDigitFrequency(std::string s) {
        // For each start index, extend the substring one digit at a time while
        // tracking digit counts; the running (distinct digits, max frequency)
        // pair tests "every digit appears equally" in O(1) per extension.
        int n = (int)s.size();
        std::unordered_set<std::string> seen;
        for (int start = 0; start < n; ++start) {
            std::vector<int> counts(10, 0);
            int distinct = 0;
            int max_count = 0;
            for (int end = start; end < n; ++end) {
                int digit = s[end] - '0';
                if (counts[digit] == 0) {
                    ++distinct;
                }
                ++counts[digit];
                max_count = std::max(max_count, counts[digit]);
                if (max_count * distinct == end - start + 1) {
                    seen.insert(s.substr(start, end - start + 1));
                }
            }
        }
        return (int)seen.size();
    }
};
