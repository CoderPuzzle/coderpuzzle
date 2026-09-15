class Solution {
  public:
    int countLetters(string s) {
        int total = 0;
        int run = 0;
        char prev = '\0';
        for (char ch : s) {
            // Extend the current uniform run, or start a new one; adding
            // the run length each step sums L(L+1)/2 per maximal run.
            if (ch == prev) {
                run++;
            } else {
                run = 1;
                prev = ch;
            }
            total += run;
        }
        return total;
    }
};
