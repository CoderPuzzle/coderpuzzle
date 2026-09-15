class Solution:
    def removePalindromeSub(self, s: str) -> int:
        # One letter's positions form a palindrome by themselves, so two
        # steps always suffice; a single step works iff s is a palindrome.
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                return 2
            left += 1
            right -= 1
        return 1
