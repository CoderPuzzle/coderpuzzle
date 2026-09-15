class Solution:
    def removeSubstring(self, s: str, k: int) -> str:
        # Run-length stack: each entry is one maximal run, char plus count.
        stack = []
        for ch in s:
            if stack and stack[-1][0] == ch:
                stack[-1][1] += 1
            else:
                stack.append([ch, 1])
            # A ')' run sitting on a '(' run is a live junction: cancel
            # min(open // k, close // k) whole blocks of k from both sides.
            while len(stack) > 1 and stack[-1][0] == ")" and stack[-2][0] == "(":
                blocks = min(stack[-2][1] // k, stack[-1][1] // k)
                if blocks == 0:
                    break
                close = stack.pop()
                below = stack.pop()
                below[1] -= blocks * k
                close[1] -= blocks * k
                # Survivors go back on top, merging equal-char neighbours;
                # a merge can expose another junction one level down.
                for run in (below, close):
                    if run[1] > 0:
                        if stack and stack[-1][0] == run[0]:
                            stack[-1][1] += run[1]
                        else:
                            stack.append(run)
        # The surviving runs are the irreducible string.
        return "".join(ch * count for ch, count in stack)
