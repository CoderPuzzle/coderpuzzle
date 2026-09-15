class Solution {

    public boolean makePalindrome(String s) {
        int mismatches = 0;
        int left = 0,
            right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) mismatches++;
            left++;
            right--;
        }
        return mismatches <= 2;
    }
}
