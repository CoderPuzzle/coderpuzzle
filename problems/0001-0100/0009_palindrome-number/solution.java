class Solution {

    public boolean isPalindrome(int x) {
        // A negative reads with a '-' on one end only, and a positive number
        // ending in 0 would have to start with 0 to mirror it. Reject both.
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        // Peel digits off the tail of x onto reversedHalf until the halves
        // meet: reversing only half never overflows and never builds a string.
        int reversedHalf = 0;
        while (x > reversedHalf) {
            reversedHalf = reversedHalf * 10 + (x % 10);
            x /= 10;
        }
        // Even digit count: the halves match exactly. Odd count: the middle
        // digit sits in reversedHalf's last place and is dropped by / 10.
        return x == reversedHalf || x == reversedHalf / 10;
    }
}
