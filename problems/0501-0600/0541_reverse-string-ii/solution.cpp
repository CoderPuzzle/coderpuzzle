class Solution {
  public:
    string reverseStr(string s, int k) {
        // Read the string as consecutive 2k-sized blocks: every block
        // contributes its first k characters reversed, its last k untouched.
        // Walking i in steps of 2k and reversing the window [i, min(i+k, n))
        // needs no special case for the tail — fewer than k characters left
        // makes the window short, so reversing it reverses all of them,
        // while k..2k-1 left makes the window exactly the first k of them.
        for (int i = 0; i < (int)s.size(); i += 2 * k) {
            int end = min(i + k, (int)s.size());
            reverse(s.begin() + i, s.begin() + end);
        }
        return s;
    }
};
