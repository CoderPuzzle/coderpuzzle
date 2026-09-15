class Solution:
    def backspaceCompare(self, s: str, t: str) -> bool:
        # Typing is a story told right-to-left: each '#' deletes the nearest
        # character to its left that survives, and backspacing an empty text
        # leaves it empty. Walk both strings from the end, skip everything
        # that gets deleted, and compare the survivors pairwise.
        def settle(text: str, index: int) -> int:
            # Move index left past deleted characters; return the nearest
            # survivor's index, or -1 when nothing survives.
            skip = 0
            while index >= 0:
                if text[index] == "#":
                    skip += 1
                elif skip > 0:
                    skip -= 1
                else:
                    return index
                index -= 1
            return -1

        i, j = len(s) - 1, len(t) - 1
        while True:
            i = settle(s, i)
            j = settle(t, j)
            if i < 0 or j < 0:
                # One text ran out: equal only if both did, so both-empty
                # counts as equal and a lone survivor decides false.
                return i == j
            if s[i] != t[j]:
                return False
            i -= 1
            j -= 1
