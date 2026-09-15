class Solution {
  public:
    string makeSmallestPalindrome(string s) {
        // A mismatched mirror pair needs one rewrite whichever letter wins;
        // keeping the smaller is never worse for any earlier position.
        int left = 0, right = static_cast<int>(s.size()) - 1;
        while (left < right) {
            if (s[left] != s[right]) {
                s[left] = s[right] = min(s[left], s[right]);
            }
            left++;
            right--;
        }
        return s;
    }
};
