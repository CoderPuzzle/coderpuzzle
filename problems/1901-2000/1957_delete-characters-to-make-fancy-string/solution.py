class Solution:
    def makeFancyString(self, s: str) -> str:
        # Greedy append: keep s[i] unless it would extend a run of three.
        # Runs of a repeated character are independent, so truncating every
        # maximal run to two chars is both minimal (every extra char beyond
        # two in a run must be deleted) and the unique answer.
        res = []
        for c in s:
            if len(res) >= 2 and res[-1] == c and res[-2] == c:
                continue
            res.append(c)
        return "".join(res)
