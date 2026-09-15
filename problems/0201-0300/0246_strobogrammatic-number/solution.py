class Solution:
    def isStrobogrammatic(self, num: str) -> bool:
        # A 180-degree turn reverses digit order and rotates each digit, and
        # only 0, 1, 8 (to themselves) and 6, 9 (to each other) survive it.
        rotated = {"0": "0", "1": "1", "8": "8", "6": "9", "9": "6"}
        left, right = 0, len(num) - 1
        while left <= right:
            # Each digit must be the rotation of the digit standing opposite.
            if num[left] not in rotated or rotated[num[left]] != num[right]:
                return False
            left += 1
            right -= 1
        return True
