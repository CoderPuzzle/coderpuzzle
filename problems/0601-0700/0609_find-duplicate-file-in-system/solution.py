from typing import List


class Solution:
    def findDuplicate(self, paths: List[str]) -> List[List[str]]:
        # One scan groups every file by what it contains. Inside a directory
        # info string the directory path comes first, then its files; a file
        # token keeps its name before the first '(' and its content between
        # that '(' and the token's last ')'. Contents hold no space — the
        # space-separated tokenization could not carry one — so every file
        # lands in exactly one bucket, its path appended in scan order.
        groups = {}
        for info in paths:
            tokens = info.split(" ")
            directory = tokens[0]
            for token in tokens[1:]:
                open_at = token.index("(")
                close_at = token.rindex(")")
                name = token[:open_at]
                content = token[open_at + 1 : close_at]
                groups.setdefault(content, []).append(directory + "/" + name)
        # A bucket answers the question only once a second file joins it; the
        # pinned order lists the survivors by content, descending.
        ordered = sorted(groups.items(), key=lambda item: item[0], reverse=True)
        return [group for _, group in ordered if len(group) >= 2]
