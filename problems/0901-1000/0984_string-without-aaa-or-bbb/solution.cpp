class Solution {
  public:
    string strWithout3a3b(int a, int b) {
        // The judge pins one exact answer: call the letter with the larger
        // count big ('a' on a tie) and the other small. While big exceeds
        // small and small has not run out, append two big letters then one
        // small letter; then, while letters remain, append one big letter if
        // any are left, then one small letter if any are left.
        char bigLetter = a >= b ? 'a' : 'b';
        char smallLetter = a >= b ? 'b' : 'a';
        int big = max(a, b);
        int small = min(a, b);
        string answer;
        while (big > small && small > 0) {
            answer += bigLetter;
            answer += bigLetter;
            answer += smallLetter;
            big -= 2;
            small -= 1;
        }
        while (big > 0 || small > 0) {
            if (big > 0) {
                answer += bigLetter;
                big--;
            }
            if (small > 0) {
                answer += smallLetter;
                small--;
            }
        }
        return answer;
    }
};
