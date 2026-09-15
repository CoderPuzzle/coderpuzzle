#include <sstream>
#include <string>
#include <vector>

class Solution {
  public:
    int isPrefixOfWord(std::string sentence, std::string searchWord) {
        std::stringstream stream(sentence);
        std::string word;
        int index = 1;
        while (std::getline(stream, word, ' ')) {
            if (word.size() >= searchWord.size() && word.compare(0, searchWord.size(), searchWord) == 0) {
                return index;
            }
            index++;
        }
        return -1;
    }
};
