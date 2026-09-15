from typing import List, Optional


class Solution:
    def decodeMessage(self, key: str, message: str) -> str:
        # First appearances in key fill the substitution table in order,
        # each new letter taking the next alphabet letter; spaces map to
        # spaces, then message is translated through the table.
        table = {" ": " "}
        nxt = iter("abcdefghijklmnopqrstuvwxyz")
        for ch in key:
            if ch not in table:
                table[ch] = next(nxt)
        return "".join(table[ch] for ch in message)
