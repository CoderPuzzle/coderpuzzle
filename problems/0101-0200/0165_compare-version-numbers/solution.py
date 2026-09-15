class Solution:
    def compareVersion(self, version1: str, version2: str) -> int:
        n, m = len(version1), len(version2)
        i = j = 0
        while i < n or j < m:
            # Read the revision at each pointer as a number, so leading zeros
            # vanish into the value instead of poisoning the comparison.
            a = 0
            while i < n and version1[i] != ".":
                a = a * 10 + int(version1[i])
                i += 1
            b = 0
            while j < m and version2[j] != ".":
                b = b * 10 + int(version2[j])
                j += 1
            if a != b:
                return -1 if a < b else 1
            # Step past the dot; a spent string simply leaves its pointer at n.
            if i < n:
                i += 1
            if j < m:
                j += 1
        return 0
