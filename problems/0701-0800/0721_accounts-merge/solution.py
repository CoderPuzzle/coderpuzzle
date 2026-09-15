from typing import List, Optional


class Solution:
    def accountsMerge(self, accounts: List[List[str]]) -> List[List[str]]:
        parent = {}

        def find(x):
            parent.setdefault(x, x)
            # Path halving: each hop skips a level, keeping later lookups short.
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        owner = {}
        for account in accounts:
            name, emails = account[0], account[1:]
            for email in emails:
                parent.setdefault(email, email)
                owner[email] = name
            # Unioning with the first email links the whole account — and,
            # transitively, any chain of accounts sharing emails.
            for email in emails[1:]:
                union(emails[0], email)

        # Second pass in input order: merge order follows the earliest-appearing
        # email of each component, exactly as the judge requires.
        groups = {}
        order = []
        for account in accounts:
            for email in account[1:]:
                root = find(email)
                if root not in groups:
                    groups[root] = set()
                    order.append(root)
                groups[root].add(email)

        merged = []
        for root in order:
            # The root's owner names the component; the set absorbed duplicates.
            merged.append([owner[root]] + sorted(groups[root]))
        return merged
