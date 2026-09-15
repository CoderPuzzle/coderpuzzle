class Solution:
    def clearStars(self, s: str) -> str:
        # Each '*' removes the newest surviving copy of the smallest letter
        # seen so far; deleting anything larger, or an older copy of that
        # letter, can only leave a bigger remainder behind.
        slots = [[] for _ in range(26)]
        dropped = bytearray(len(s))
        for i, ch in enumerate(s):
            if ch == "*":
                dropped[i] = 1
                for c in range(26):
                    if slots[c]:
                        dropped[slots[c].pop()] = 1
                        break
            else:
                slots[ord(ch) - 97].append(i)
        return "".join(ch for i, ch in enumerate(s) if not dropped[i])
