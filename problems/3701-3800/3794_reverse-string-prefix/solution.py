class Solution:
    def reversePrefix(self, s: str, k: int) -> str:
        # Mutable buffer; two pointers close on the middle of the prefix.
        chars = list(s)
        left, right = 0, k - 1
        while left < right:
            chars[left], chars[right] = chars[right], chars[left]
            left += 1
            right -= 1
        return "".join(chars)
