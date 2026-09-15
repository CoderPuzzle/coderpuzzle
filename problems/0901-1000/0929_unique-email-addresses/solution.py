from typing import List, Optional


class Solution:
    def numUniqueEmails(self, emails: List[str]) -> int:
        distinct = set()
        for email in emails:
            local = []
            ignored = False
            for i, ch in enumerate(email):
                if ch == "@":
                    # The domain is untouched: take it verbatim from '@' on.
                    distinct.add("".join(local) + email[i:])
                    break
                if ignored:
                    continue  # everything after the first '+' is dropped
                if ch == ".":
                    continue  # dots in the local name vanish
                if ch == "+":
                    ignored = True
                    continue
                local.append(ch)
        return len(distinct)
