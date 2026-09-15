class Solution {
  public:
    bool detectCapitalUse(string word) {
        // The three legal usages differ only in how many capitals the word
        // holds and where they sit, so one sweep that counts capitals in the
        // ASCII upper range captures everything there is to check.
        int capitals = 0;
        for (char ch : word) {
            if (ch >= 'A' && ch <= 'Z') {
                capitals++;
            }
        }
        // No capitals is the all-lowercase word, every character a capital
        // is the all-caps word, and a lone capital is legal only when it
        // leads the word.
        char first = word[0];
        return capitals == 0 || capitals == (int)word.size() || (capitals == 1 && first >= 'A' && first <= 'Z');
    }
};
