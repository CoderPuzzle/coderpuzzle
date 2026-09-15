class Solution {
  public:
    bool checkPalindromeFormation(string a, string b) { return check(a, b) || check(b, a); }

  private:
    static bool isPalindrome(const string &s, int left, int right) {
        while (left < right) {
            if (s[left] != s[right]) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    static bool check(const string &x, const string &y) {
        int left = 0;
        int right = static_cast<int>(x.size()) - 1;
        while (left < right && x[left] == y[right]) {
            left++;
            right--;
        }
        if (left >= right) {
            return true;
        }
        return isPalindrome(x, left, right) || isPalindrome(y, left, right);
    }
};
