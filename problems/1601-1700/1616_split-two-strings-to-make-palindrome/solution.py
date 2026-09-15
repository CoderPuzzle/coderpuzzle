from typing import List, Optional


class Solution:
    def checkPalindromeFormation(self, a: str, b: str) -> bool:
        def is_palindrome(s: str, left: int, right: int) -> bool:
            while left < right:
                if s[left] != s[right]:
                    return False
                left += 1
                right -= 1
            return True

        def check(x: str, y: str) -> bool:
            left, right = 0, len(x) - 1
            while left < right and x[left] == y[right]:
                left += 1
                right -= 1
            if left >= right:
                return True
            return is_palindrome(x, left, right) or is_palindrome(y, left, right)

        return check(a, b) or check(b, a)
