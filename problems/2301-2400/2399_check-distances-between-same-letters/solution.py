class Solution:
    def checkDistances(self, s: str, distance: List[int]) -> bool:
        # Remember each letter's first index; on the second sighting the
        # letters strictly between number second - first - 1, which must
        # equal that letter's distance entry.
        first: dict[str, int] = {}
        for i, c in enumerate(s):
            if c in first:
                if i - first[c] - 1 != distance[ord(c) - 97]:
                    return False
            else:
                first[c] = i
        return True
