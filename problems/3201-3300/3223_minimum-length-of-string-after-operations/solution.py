class Solution:
    def minimumLength(self, s: str) -> int:
        # Each operation deletes two copies of one letter — the closest
        # same-letter occurrences on either side of a pivot — so every
        # letter's count keeps its parity while pairs keep coming off.
        counts = [0] * 26
        for ch in s:
            counts[ord(ch) - ord("a")] += 1
        # A letter with three or more copies always has a usable pivot,
        # so it reduces to one copy when odd and two when even; letters
        # below three are already stuck there.
        total = 0
        for count in counts:
            if count == 0:
                continue
            total += 1 if count % 2 == 1 else 2
        return total
