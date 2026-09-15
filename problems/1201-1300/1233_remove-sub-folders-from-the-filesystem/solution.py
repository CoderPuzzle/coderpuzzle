from typing import List


class Solution:
    def removeSubfolders(self, folder: List[str]) -> List[str]:
        out = []
        for path in sorted(folder):
            # The slash separates a true child ("/a" + "/") from a longer
            # sibling sharing the name prefix ("/ab" vs "/a/").
            if not out or not path.startswith(out[-1] + "/"):
                out.append(path)
        return out
