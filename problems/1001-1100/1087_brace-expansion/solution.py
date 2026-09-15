from typing import List


class Solution:
    def expand(self, s: str) -> List[str]:
        # Parse into option groups: a bare letter is a one-element group,
        # and "{a,b,c}" becomes ["a","b","c"]. Backtrack over the choices,
        # then sort the finished words.
        tokens = []
        i = 0
        while i < len(s):
            if s[i] == "{":
                j = s.index("}", i)
                tokens.append(s[i + 1 : j].split(","))
                i = j + 1
            else:
                tokens.append([s[i]])
                i += 1
        result = []

        def dfs(idx: int, cur: str) -> None:
            if idx == len(tokens):
                result.append(cur)
                return
            for opt in tokens[idx]:
                dfs(idx + 1, cur + opt)

        dfs(0, "")
        result.sort()
        return result
