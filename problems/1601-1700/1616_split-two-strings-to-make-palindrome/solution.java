class Solution {

    public boolean checkPalindromeFormation(String a, String b) {
        return check(a, b) || check(b, a);
    }

    private boolean check(String x, String y) {
        int left = 0;
        int right = x.length() - 1;
        while (left < right && x.charAt(left) == y.charAt(right)) {
            left++;
            right--;
        }
        if (left >= right) {
            return true;
        }
        return isPalindrome(x, left, right) || isPalindrome(y, left, right);
    }

    private boolean isPalindrome(String s, int left, int right) {
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}
