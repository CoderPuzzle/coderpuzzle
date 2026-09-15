class Solution:
    def simplifyPath(self, path: str) -> str:
        # Splitting on "/" turns repeated and edge slashes into empty segments
        # and hands each directory to the loop as one candidate, so only the
        # dot rules remain to apply.
        stack = []
        for segment in path.split("/"):
            if segment == "..":
                # One level up: drop the last name pushed. An empty stack is
                # the root, where going up is not possible, so it stays empty.
                if stack:
                    stack.pop()
            elif segment != "." and segment != "":
                # "." is the current directory, "" a repeated or edge slash;
                # every other segment, "..." and "...." included, is a name.
                stack.append(segment)
        # A leading slash plus exactly one slash between the survivors.
        return "/" + "/".join(stack)
