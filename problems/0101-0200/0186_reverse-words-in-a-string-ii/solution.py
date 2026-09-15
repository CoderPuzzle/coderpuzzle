class Solution:
    def reverseWords(self, s: str) -> str:
        # Python strings are immutable, so the flips run on a char list — the
        # honest equivalent of the in-place algorithm.
        chars = list(s)
        n = len(chars)

        def flip(lo: int, hi: int) -> None:
            while lo < hi:
                chars[lo], chars[hi] = chars[hi], chars[lo]
                lo += 1
                hi -= 1

        # Flip the whole text once: the words land in reverse order, each with
        # its letters backwards. Re-flipping every word restores the letters.
        flip(0, n - 1)
        start = 0
        for stop in range(n + 1):
            # A word ends at each separating space (and at the end of the line).
            if stop == n or chars[stop] == " ":
                flip(start, stop - 1)
                start = stop + 1
        return "".join(chars)
