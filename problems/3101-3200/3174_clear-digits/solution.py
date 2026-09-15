class Solution:
    def clearDigits(self, s: str) -> str:
        # Survivors so far form a stack; a digit always removes the closest
        # non-digit still standing to its left, which is exactly its top.
        kept = []
        for ch in s:
            if "0" <= ch <= "9":
                kept.pop()
            else:
                kept.append(ch)
        return "".join(kept)
