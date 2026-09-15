class Solution:
    def countKeyChanges(self, s: str) -> int:
        keys = s.lower()
        changes = 0
        for i in range(1, len(keys)):
            if keys[i] != keys[i - 1]:
                changes += 1
        return changes
