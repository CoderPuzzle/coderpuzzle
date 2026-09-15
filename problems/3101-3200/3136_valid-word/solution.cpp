class Solution {
  public:
    bool isValid(string word) {
        // One scan: reject any character outside digits/letters while
        // tracking whether a vowel and a consonant were both seen.
        if (word.size() < 3) {
            return false;
        }
        string vowels = "aeiou";
        bool hasVowel = false;
        bool hasConsonant = false;
        for (char ch : word) {
            char low = ch | 0x20;
            if ((ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z')) {
                if (vowels.find(low) != string::npos) {
                    hasVowel = true;
                } else {
                    hasConsonant = true;
                }
            } else if (ch >= '0' && ch <= '9') {
                continue;
            } else {
                return false;
            }
        }
        return hasVowel && hasConsonant;
    }
};
