from typing import List


class Solution:
    def countMatches(self, items: List[List[str]], ruleKey: str, ruleValue: str) -> int:
        # The three rule keys are exactly the three columns of every item,
        # so the key resolves once to a column index and the loop below
        # compares one fixed field of each row.
        index = {"type": 0, "color": 1, "name": 2}[ruleKey]
        matches = 0
        for item in items:
            if item[index] == ruleValue:
                matches += 1
        return matches
