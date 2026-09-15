from collections import Counter


class Solution:
    def largestPalindromic(self, num: str) -> str:
        # Spend each digit's full pairs into the left half, highest
        # digit first; the largest odd-count digit becomes the center.
        # Zero pairs are worthless without a nonzero digit ahead of
        # them, so a leading-zero half is stripped; all zeros -> "0".
        cnt = Counter(num)
        half = "".join(d * (cnt[d] // 2) for d in "9876543210")
        mid = next((d for d in "9876543210" if cnt[d] % 2 == 1), "")
        half = half.lstrip("0")
        return (half + mid + half[::-1]) or "0"
