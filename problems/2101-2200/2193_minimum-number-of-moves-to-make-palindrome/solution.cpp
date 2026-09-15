class Solution {
  public:
    int minMovesToMakePalindrome(string s) {
        int moves = 0;
        int left = 0, right = (int)s.size() - 1;
        while (left < right) {
            if (s[left] == s[right]) {
                left += 1;
                right -= 1;
                continue;
            }
            // find rightmost occurrence of s[left] in (left, right]
            int k = right;
            while (k > left && s[k] != s[left]) {
                k -= 1;
            }
            if (k == left) {
                // s[left] is the lone middle character: nudge it one step inward
                swap(s[left], s[left + 1]);
                moves += 1;
            } else {
                // bubble s[k] rightward to position right
                while (k < right) {
                    swap(s[k], s[k + 1]);
                    k += 1;
                    moves += 1;
                }
                left += 1;
                right -= 1;
            }
        }
        return moves;
    }
};
