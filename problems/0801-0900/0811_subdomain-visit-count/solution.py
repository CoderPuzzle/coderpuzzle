from typing import List


class Solution:
    def subdomainVisits(self, cpdomains: List[str]) -> List[str]:
        # One pass: each entry fans its count out over every dot-suffix of
        # its domain — the domain itself and each subdomain cut at a dot.
        counts = {}
        for cpdomain in cpdomains:
            rep, domain = cpdomain.split(" ", 1)
            rep = int(rep)
            i = 0
            while True:
                subdomain = domain[i:]
                counts[subdomain] = counts.get(subdomain, 0) + rep
                nxt = domain.find(".", i)
                if nxt == -1:
                    break
                i = nxt + 1
        # Pinned output order: ascending lexicographic by domain name.
        return [f"{total} {subdomain}" for subdomain, total in sorted(counts.items())]
