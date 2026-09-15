class Solution:
    def isPalindrome(self, x: int) -> bool:
        # A negative reads with a '-' on one end only, and a positive number
        # ending in 0 would have to start with 0 to mirror it. Reject both.
        if x < 0 or (x % 10 == 0 and x != 0):
            return False
        # Peel digits off the tail of x onto reversed_half until the halves
        # meet: reversing only half never overflows and never builds a string.
        reversed_half = 0
        while x > reversed_half:
            reversed_half = reversed_half * 10 + x % 10
            x //= 10
        # Even digit count: the halves match exactly. Odd count: the middle
        # digit sits in reversed_half's last place and is dropped by // 10.
        return x == reversed_half or x == reversed_half // 10
