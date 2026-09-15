class Solution:
    def makeAntiPalindrome(self, s: str) -> str:
        # Swaps reach every permutation of s, so the answer is the
        # lexicographically smallest anti-palindrome rearrangement. Sorting
        # already gives the smallest possible left half, and the left half
        # of a sorted string never mirrors onto itself, so only the right
        # half needs repair: whenever a position matches its mirror, swap
        # in the next larger letter, tracked by a pointer that only moves
        # right. The pointer running off the end means some letter fills
        # more than half the string — no arrangement can separate it.
        chars = sorted(s)
        n = len(chars)
        p = n // 2
        for i in range(n // 2, n):
            if chars[i] == chars[n - 1 - i]:
                while p < n and chars[p] == chars[i]:
                    p += 1
                if p == n:
                    return "-1"
                chars[i], chars[p] = chars[p], chars[i]
                p += 1
        return "".join(chars)
