from typing import List


class Solution:
    def getFolderNames(self, names: List[str]) -> List[str]:
        used = set()
        next_k = {}
        result = []
        for name in names:
            if name not in used:
                used.add(name)
                if name not in next_k:
                    next_k[name] = 1
                result.append(name)
                continue
            base = name
            k = next_k.get(base, 1)
            candidate = f"{base}({k})"
            while candidate in used:
                k += 1
                candidate = f"{base}({k})"
            used.add(candidate)
            next_k[base] = k + 1
            # A suffixed assignment "stem(k)" can collide later; seed the
            # stem's memory so the next probe for that stem starts past it.
            idx = candidate.rfind("(")
            if idx > 0 and candidate[-1] == ")" and candidate[idx + 1 : -1].isdigit():
                stem = candidate[:idx]
                val = int(candidate[idx + 1 : -1]) + 1
                if stem not in next_k or next_k[stem] < val:
                    next_k[stem] = max(next_k.get(stem, 1), val)
            result.append(candidate)
        return result
