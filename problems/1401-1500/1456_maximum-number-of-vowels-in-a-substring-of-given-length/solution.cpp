class Solution {
  public:
    int maxVowels(string s, int k) {
        auto isVowel = [](char c) { return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u'; };
        // count vowels of the first window once; afterwards only the
        // entering letter (i) and the leaving letter (i-k) can change it
        int count = 0;
        for (int i = 0; i < k && i < (int)s.size(); i++) {
            if (isVowel(s[i]))
                count++;
        }
        int best = count;
        for (int i = k; i < (int)s.size(); i++) {
            if (isVowel(s[i]))
                count++;
            if (isVowel(s[i - k]))
                count--;
            best = max(best, count);
        }
        return best;
    }
};
