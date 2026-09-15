from typing import List, Optional


class Solution:
    def removeInvalidParentheses(self, s: str) -> List[str]:
        def is_valid(string):
            # Balance scan: fail as soon as a ')' has no '(' to match,
            # and require the counter to end back at zero.
            count = 0
            for ch in string:
                if ch == "(":
                    count += 1
                elif ch == ")":
                    count -= 1
                    if count < 0:
                        return False
            return count == 0

        # BFS over removal counts: every string in a level has had the
        # same number of characters deleted, so the first level holding
        # any valid string is exactly the minimum-removal answer.
        level = {s}
        while True:
            valid = sorted(item for item in level if is_valid(item))
            if valid:
                return valid
            # Expand one more deletion; only parentheses are removed and
            # the set dedups deletions that produce the same string.
            next_level = set()
            for item in level:
                for i, ch in enumerate(item):
                    if ch in "()":
                        next_level.add(item[:i] + item[i + 1 :])
            level = next_level
