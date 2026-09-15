class Solution:
    def getSmallestString(self, s: str, k: int) -> str:
        # Greedy per position: the smallest feasible letter is 'a' when its
        # cyclic distance still fits the budget; otherwise every smaller
        # letter is out of reach and exactly `budget` steps down from s[i]
        # is the first affordable letter.
        result = []
        budget = k
        for ch in s:
            step = ord(ch) - ord("a")
            to_a = min(step, 26 - step)
            if to_a <= budget:
                result.append("a")
                budget -= to_a
            else:
                result.append(chr(ord(ch) - budget))
                budget = 0
        return "".join(result)
