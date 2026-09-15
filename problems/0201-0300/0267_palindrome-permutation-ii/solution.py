from typing import List


class Solution:
    def generatePalindromes(self, s: str) -> List[str]:
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - 97] += 1
        # A palindrome pairs up every letter except at most one middle
        # occupant, so a second odd count means no palindromic arrangement.
        middle = ""
        for i in range(26):
            if counts[i] % 2:
                if middle:
                    return []
                middle = chr(97 + i)
        # Quota for the left half, one bucket per distinct letter. Choosing
        # buckets rather than positions makes every half distinct by
        # construction — the duplicate branches a naive per-position
        # permutation would explore never arise.
        half = [count // 2 for count in counts]
        target = len(s) // 2
        results: List[str] = []
        current: List[str] = []

        def walk() -> None:
            if len(current) == target:
                left = "".join(current)
                results.append(left + middle + left[::-1])
                return
            # Letters ascend, so earlier positions vary slowest and the
            # palindromes come out in ascending lexicographic order.
            for i in range(26):
                if half[i] == 0:
                    continue
                half[i] -= 1
                current.append(chr(97 + i))
                walk()
                current.pop()
                half[i] += 1

        walk()
        return results
