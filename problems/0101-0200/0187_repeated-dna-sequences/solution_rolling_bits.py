LETTERS = "ACGT"


class Solution:
    def findRepeatedDnaSequences(self, s: str) -> list[str]:
        seen = set()
        # A second set collects each repeated window exactly once, even when
        # it occurs three or more times.
        repeated = set()
        code = 0
        for i, ch in enumerate(s):
            # Two bits per letter pack the whole window into one integer:
            # the oldest letter slides out as the new one slides in.
            code = ((code << 2) | LETTERS.index(ch)) & 0xFFFFF
            # Fewer than ten letters seen: the register holds no full window.
            if i >= 9:
                if code in seen:
                    repeated.add(code)
                else:
                    seen.add(code)
        # Decode the surviving codes back into letters; sorted output for a
        # deterministic order.
        return sorted(self._decode(code) for code in repeated)

    def _decode(self, code: int) -> str:
        letters = []
        for _ in range(10):
            letters.append(LETTERS[code & 3])
            code >>= 2
        return "".join(reversed(letters))
