class Solution:
    def lengthLongestPath(self, input: str) -> int:
        # depths[d] is the absolute-path length of the most recent entry seen
        # at depth d; a name at depth d extends the entry at depth d - 1.
        depths = [0]
        longest = 0
        for token in input.split("\n"):
            name = token.lstrip("\t")
            depth = len(token) - len(name)
            # The path to this entry is its parent's path, one '/' separator,
            # then the name itself (the root level has no separator).
            path = (depths[depth - 1] + 1 if depth else 0) + len(name)
            if depth < len(depths):
                depths[depth] = path
            else:
                depths.append(path)
            # Files are exactly the names that contain a dot.
            if "." in name:
                longest = max(longest, path)
        return longest
