class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        keep = [True] * len(s)
        opens = []  # indices of '(' still hoping for a partner
        for i, ch in enumerate(s):
            if ch == "(":
                opens.append(i)
            elif ch == ")":
                if opens:
                    opens.pop()  # matched: both survive
                else:
                    keep[i] = False  # orphan close, doomed
        for i in opens:
            keep[i] = False  # opens that never found a close
        return "".join(ch for ch, k in zip(s, keep) if k)
