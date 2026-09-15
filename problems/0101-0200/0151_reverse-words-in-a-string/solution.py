class Solution:
    def reverseWords(self, s: str) -> str:
        # Python strings are immutable, so the sweep runs on a char list — the
        # honest equivalent of the in-place algorithm.
        chars = list(s)
        # Flip the whole text once: word order reverses, and every word's
        # letters come out backwards. The sweep below puts the letters back.
        chars.reverse()
        n = len(chars)
        write = 0
        read = 0
        while read < n:
            # Skip the run of spaces before the next word.
            while read < n and chars[read] == " ":
                read += 1
            if read == n:
                break
            # One separating space between words, none before the first.
            if write > 0:
                chars[write] = " "
                write += 1
            start = write
            while read < n and chars[read] != " ":
                chars[write] = chars[read]
                write += 1
                read += 1
            # The word just copied still has its letters flipped; restore them.
            lo, hi = start, write - 1
            while lo < hi:
                chars[lo], chars[hi] = chars[hi], chars[lo]
                lo += 1
                hi -= 1
        return "".join(chars[:write])
