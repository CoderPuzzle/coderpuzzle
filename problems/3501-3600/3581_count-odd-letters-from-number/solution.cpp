class Solution {
  public:
    int countOddLetters(int n) {
        // Spell every digit as its lowercase word, concatenate in digit
        // order, and count letters: the answer is how many distinct
        // characters end up with an odd frequency.
        static const char *words[] = {"zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"};
        string text = to_string(n);
        int counts[26] = {0};
        for (char digit : text) {
            for (char ch : string(words[digit - '0'])) {
                counts[ch - 'a']++;
            }
        }
        int odd = 0;
        for (int count : counts) {
            if (count % 2 == 1)
                ++odd;
        }
        return odd;
    }
};
