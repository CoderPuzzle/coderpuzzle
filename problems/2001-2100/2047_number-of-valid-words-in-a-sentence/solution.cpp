class Solution {
  public:
    int countValidWords(string sentence) {
        istringstream words(sentence);
        string token;
        int validWords = 0;

        while (words >> token) {
            validWords += isValid(token);
        }
        return validWords;
    }

  private:
    bool isValid(const string &token) const {
        int hyphens = 0;
        int punctuation = 0;

        for (int index = 0; index < static_cast<int>(token.size()); ++index) {
            char character = token[index];
            if (isLetter(character)) {
                continue;
            }
            if (character == '-') {
                ++hyphens;
                if (hyphens > 1 || index == 0 || index + 1 == static_cast<int>(token.size()) ||
                    !isLetter(token[index - 1]) || !isLetter(token[index + 1])) {
                    return false;
                }
            } else if (character == '!' || character == '.' || character == ',') {
                ++punctuation;
                if (punctuation > 1 || index + 1 != static_cast<int>(token.size())) {
                    return false;
                }
            } else {
                return false;
            }
        }

        return true;
    }

    bool isLetter(char character) const { return character >= 'a' && character <= 'z'; }
};
