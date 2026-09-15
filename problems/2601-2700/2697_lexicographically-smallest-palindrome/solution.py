class Solution:
    def makeSmallestPalindrome(self, s: str) -> str:
        # A mismatched mirror pair needs one rewrite whichever letter wins;
        # keeping the smaller is never worse for any earlier position.
        chars = list(s)
        left, right = 0, len(chars) - 1
        while left < right:
            if chars[left] != chars[right]:
                chars[left] = chars[right] = min(chars[left], chars[right])
            left += 1
            right -= 1
        return "".join(chars)
