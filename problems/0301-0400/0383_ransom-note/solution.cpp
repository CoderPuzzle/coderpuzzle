class Solution {
  public:
    bool canConstruct(string ransomNote, string magazine) {
        // The magazine is a budget: tally its letters, one slot per letter
        // of the alphabet, then spend the note against that budget.
        array<int, 26> counts{};
        for (char ch : magazine) {
            counts[ch - 'a']++;
        }
        // A slot dipping below zero means the magazine cannot supply that
        // letter often enough — each of its letters is usable only once.
        for (char ch : ransomNote) {
            if (--counts[ch - 'a'] < 0) {
                return false;
            }
        }
        return true;
    }
};
