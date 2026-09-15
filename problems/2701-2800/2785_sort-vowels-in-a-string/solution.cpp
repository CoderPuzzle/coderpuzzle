class Solution {
  public:
    string sortVowels(string s) {
        // Consonants never move; only vowel values permute among the vowel
        // slots. Collect the vowels, sort them by ASCII (every uppercase
        // vowel sorts before every lowercase one, e.g. 'O' < 'e'), and pour
        // them back into the vowel slots left to right.
        auto isVowel = [](char c) {
            switch (c) {
            case 'a':
            case 'e':
            case 'i':
            case 'o':
            case 'u':
            case 'A':
            case 'E':
            case 'I':
            case 'O':
            case 'U':
                return true;
            }
            return false;
        };
        string vowels;
        for (char c : s) {
            if (isVowel(c)) {
                vowels.push_back(c);
            }
        }
        sort(vowels.begin(), vowels.end());
        int i = 0;
        for (char &c : s) {
            if (isVowel(c)) {
                c = vowels[i++];
            }
        }
        return s;
    }
};
