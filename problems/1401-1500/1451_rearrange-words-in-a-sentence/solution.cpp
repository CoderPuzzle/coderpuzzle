#include <algorithm>
#include <sstream>
#include <string>
#include <vector>

class Solution {
  public:
    std::string arrangeWords(std::string text) {
        std::vector<std::string> words;
        std::stringstream stream(text);
        std::string word;
        while (std::getline(stream, word, ' ')) {
            words.push_back(word);
        }
        words[0][0] = (char)std::tolower(words[0][0]);
        std::stable_sort(words.begin(), words.end(),
                         [](const std::string &a, const std::string &b) { return a.size() < b.size(); });
        std::string first = words[0];
        first[0] = (char)std::toupper(first[0]);
        std::string result = first;
        for (int i = 1; i < (int)words.size(); i++) {
            result += " " + words[i];
        }
        return result;
    }
};
