class Solution:
    def minimizeStringValue(self, s: str) -> str:
        # A letter appearing x times costs x*(x-1)/2 no matter where it sits,
        # so only the final counts matter: each '?' should take the currently
        # least frequent letter (smallest letter on ties — that also makes the
        # fill lexicographically smallest). The chosen letters are then sorted
        # into the '?' slots left to right. Scanning all 26 counts per '?' is
        # O(26n), well within n = 1e5.
        counts = [0] * 26
        for ch in s:
            if ch != "?":
                counts[ord(ch) - ord("a")] += 1
        picks = []
        for ch in s:
            if ch == "?":
                best = 0
                for letter in range(1, 26):
                    if counts[letter] < counts[best]:
                        best = letter
                counts[best] += 1
                picks.append(best)
        picks.sort()
        characters = list(s)
        at = 0
        for i, ch in enumerate(characters):
            if ch == "?":
                characters[i] = chr(ord("a") + picks[at])
                at += 1
        return "".join(characters)
