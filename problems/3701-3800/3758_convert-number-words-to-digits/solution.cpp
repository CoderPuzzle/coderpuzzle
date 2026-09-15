#include <string>
#include <unordered_map>

using namespace std;

class Solution {
  public:
    string convertNumber(string s) {
        // Left-to-right greedy scan: at most one digit word can start at any
        // position (no word is a prefix of another), so taking the first hit
        // is unambiguous. Lengths 3, 4, 5 cover all ten words.
        static const unordered_map<string, string> words = {
            {"zero", "0"}, {"one", "1"},  {"two", "2"}, {"five", "5"},  {"three", "3"},
            {"four", "4"}, {"nine", "9"}, {"six", "6"}, {"seven", "7"}, {"eight", "8"},
        };
        string digits;
        int n = s.size();
        int i = 0;
        while (i < n) {
            bool matched = false;
            for (int length = 3; length <= 5 && i + length <= n; ++length) {
                auto it = words.find(s.substr(i, length));
                if (it != words.end()) {
                    digits += it->second;
                    i += length;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                ++i;
            }
        }
        return digits;
    }
};
