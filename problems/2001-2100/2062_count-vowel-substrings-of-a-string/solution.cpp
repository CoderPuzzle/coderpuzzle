class Solution {
  public:
    int countVowelSubstrings(string word) {
        int total = 0;
        for (int start = 0; start < static_cast<int>(word.size()); ++start) {
            int mask = 0;
            for (int end = start; end < static_cast<int>(word.size()); ++end) {
                int bit = vowelBit(word[end]);
                if (bit == 0) {
                    break;
                }
                mask |= bit;
                if (mask == 31) {
                    ++total;
                }
            }
        }
        return total;
    }

  private:
    int vowelBit(char character) {
        switch (character) {
        case 'a':
            return 1;
        case 'e':
            return 2;
        case 'i':
            return 4;
        case 'o':
            return 8;
        case 'u':
            return 16;
        default:
            return 0;
        }
    }
};
