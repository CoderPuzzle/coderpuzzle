class Solution:
    def canConvert(self, str1: str, str2: str) -> bool:
        if str1 == str2:
            # Zero conversions needed; cycles in the mapping never fire.
            return True
        mapping = {}
        for a, b in zip(str1, str2):
            if a in mapping and mapping[a] != b:
                # One source letter would need two different targets.
                return False
            mapping[a] = b
        # A cycle needs a spare letter to break it, and a spare is any
        # letter that never appears as a target.
        return len(set(str2)) < 26
