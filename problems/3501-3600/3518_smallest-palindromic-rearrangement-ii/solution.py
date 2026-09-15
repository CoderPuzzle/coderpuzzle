class Solution:
    def smallestPalindrome(self, s: str, k: int) -> str:
        # The k-th palindrome is the k-th arrangement of the forced half
        # multiset (count[c] // 2 of each letter), mirrored around the lone
        # odd letter. Walk the half's positions picking, smallest letter
        # first, the letter whose block still contains rank k. Multinomials
        # are capped at k (uncapped they overflow any fixed width); every
        # intermediate stays below k * n <= 10^6 * 5000, so 64-bit arithmetic
        # (and JS doubles, < 2^53) is exact throughout.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        half = [c // 2 for c in counts]
        m = len(s) // 2
        middle = ""
        for i, c in enumerate(counts):
            if c % 2:
                middle = chr(97 + i)

        # min(multinomial of the half counts over r slots, k): a product of
        # binomials abandoned the moment it reaches k.
        def arrangements(h, r):
            acc = 1
            rem = r
            for c in h:
                if c == 0:
                    continue
                small = min(c, rem - c)
                binom = 1
                for i in range(1, small + 1):
                    binom = binom * (rem - small + i) // i
                    if binom >= k:
                        binom = k
                        break
                acc *= binom
                if acc >= k:
                    return k
                rem -= c
            return acc

        if arrangements(half, m) < k:
            return ""
        picked = []
        r = m
        while r > 0:
            for c in range(26):
                if half[c] == 0:
                    continue
                half[c] -= 1
                ways = arrangements(half, r - 1)
                if k <= ways:
                    picked.append(chr(97 + c))
                    r -= 1
                    break
                k -= ways
                half[c] += 1
        return "".join(picked) + middle + "".join(reversed(picked))
