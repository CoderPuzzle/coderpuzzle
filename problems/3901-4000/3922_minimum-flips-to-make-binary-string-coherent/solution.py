class Solution:
    def minFlips(self, s: str) -> int:
        # Track how much of each forbidden pattern ("011", "110") is already
        # matched as a subsequence of the string built so far. State
        # (a, b) means the first a chars of "011" and b chars of "110" are
        # matched; reaching 3 is dead. Costs are minimum flips per state.
        P1 = "011"
        P2 = "110"
        states = {(0, 0): 0}
        for char in s:
            nxt = {}
            for (a, b), cost in states.items():
                for put in "01":
                    total = cost + (put != char)
                    na = a + 1 if a < 3 and put == P1[a] else a
                    nb = b + 1 if b < 3 and put == P2[b] else b
                    if na == 3 or nb == 3:
                        continue  # this branch would contain the pattern
                    key = (na, nb)
                    if nxt.get(key, 1 << 30) > total:
                        nxt[key] = total
            states = nxt
        return min(states.values())
