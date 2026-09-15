class Solution {

    public int removePalindromeSub(String s) {
        // One letter's positions form a palindrome by themselves, so two
        // steps always suffice; a single step works iff s is a palindrome.
        int left = 0;
        int right = s.length() - 1;
        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return 2;
            }
            ++left;
            --right;
        }
        return 1;
    }
}
