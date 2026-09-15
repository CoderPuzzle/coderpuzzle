class Solution:
    def validPalindrome(self, s: str) -> bool:
        # Walk two pointers inward while the outer pairs agree. The first
        # mismatch is the only place a deletion can matter: it must remove
        # one end of the broken pair, so the answer is whether the stretch
        # without the left char or the stretch without the right char is an
        # exact palindrome. An unbroken walk needs no deletion at all.
        def palindrome(lo: int, hi: int) -> bool:
            while lo < hi:
                if s[lo] != s[hi]:
                    return False
                lo += 1
                hi -= 1
            return True

        lo, hi = 0, len(s) - 1
        while lo < hi:
            if s[lo] != s[hi]:
                return palindrome(lo + 1, hi) or palindrome(lo, hi - 1)
            lo += 1
            hi -= 1
        return True
