class Solution:
    def rearrangeString(self, s: str, x: str, y: str) -> str:
        # Descending when x < y, ascending otherwise: sorting groups equal
        # letters, so every y block then lands before the x block.
        return "".join(sorted(s, reverse=x < y))
