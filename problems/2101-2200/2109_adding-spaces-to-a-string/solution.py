from typing import List, Optional


class Solution:
    def addSpaces(self, s: str, spaces: List[int]) -> str:
        parts = []
        space_index = 0
        for index, character in enumerate(s):
            if space_index < len(spaces) and spaces[space_index] == index:
                parts.append(" ")
                space_index += 1
            parts.append(character)
        return "".join(parts)
