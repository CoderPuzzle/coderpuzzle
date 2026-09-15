from typing import List


class Solution:
    def uniqueEmailGroups(self, emails: List[str]) -> int:
        # A group is identified by its normalized address: the local part
        # loses its dots and anything from the first '+', then both parts
        # are lowercased.
        seen = set()
        for email in emails:
            at = email.index("@")
            local = email[:at]
            plus = local.find("+")
            if plus != -1:
                local = local[:plus]
            key = local.replace(".", "").lower() + "@" + email[at + 1 :].lower()
            seen.add(key)
        return len(seen)
