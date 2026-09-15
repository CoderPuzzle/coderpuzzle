class Solution {
  public:
    int vowelStrings(vector<string> &words, int left, int right) {
        // A word counts exactly when both endpoints are vowels; a char
        // classification helper keeps each endpoint check constant time.
        auto isVowel = [](char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; };
        int count = 0;
        for (int i = left; i <= right; ++i) {
            const string &word = words[i];
            if (isVowel(word.front()) && isVowel(word.back()))
                count++;
        }
        return count;
    }
};
