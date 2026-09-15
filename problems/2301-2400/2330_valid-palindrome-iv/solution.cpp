class Solution {
  public:
    bool makePalindrome(string s) {
        int mismatches = 0;
        int left = 0, right = static_cast<int>(s.size()) - 1;
        while (left < right) {
            if (s[left] != s[right])
                mismatches++;
            left++;
            right--;
        }
        return mismatches <= 2;
    }
};
