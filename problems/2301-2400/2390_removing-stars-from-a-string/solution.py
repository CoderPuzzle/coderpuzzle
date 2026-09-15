class Solution:
    def removeStars(self, s: str) -> str:
        # A star deletes the most recently kept character, so keep a
        # stack of survivors: push letters, pop on stars.
        kept = []
        for c in s:
            if c == "*":
                kept.pop()
            else:
                kept.append(c)
        return "".join(kept)
