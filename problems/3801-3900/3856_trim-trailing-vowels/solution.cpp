class Solution {
  public:
    string trimTrailingVowels(string s) {
        int end = s.size();
        while (end > 0 && isVowel(s[end - 1])) {
            --end;
        }
        s.resize(end);
        return s;
    }

  private:
    bool isVowel(char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; }
};
