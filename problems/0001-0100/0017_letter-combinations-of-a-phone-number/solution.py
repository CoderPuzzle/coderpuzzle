from typing import List


class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        groups = {
            "2": "abc",
            "3": "def",
            "4": "ghi",
            "5": "jkl",
            "6": "mno",
            "7": "pqrs",
            "8": "tuv",
            "9": "wxyz",
        }
        # Zero digits means zero combinations: [] (not [""]), and the walk
        # below must never start on an empty tree.
        if not digits:
            return []
        combinations: List[str] = []
        current: List[str] = []

        def walk(position: int) -> None:
            # A leaf is a complete root-to-leaf path: one letter per digit.
            if position == len(digits):
                combinations.append("".join(current))
                return
            # Visit letters in group order so earlier digits vary slowest.
            for letter in groups[digits[position]]:
                current.append(letter)
                walk(position + 1)
                current.pop()

        walk(0)
        return combinations
