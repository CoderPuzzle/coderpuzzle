class Solution {
  public:
    long long countVowels(string word) {
        long long total = 0;
        for (int index = 0; index < static_cast<int>(word.size()); ++index) {
            if (isVowel(word[index])) {
                total += static_cast<long long>(index + 1) * static_cast<long long>(word.size() - index);
            }
        }
        return total;
    }

  private:
    bool isVowel(char character) const {
        return character == 'a' || character == 'e' || character == 'i' || character == 'o' || character == 'u';
    }
};
