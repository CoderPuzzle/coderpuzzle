from typing import List, Optional
from bisect import bisect_left


class Solution:
    def suggestedProducts(self, products: List[str], searchWord: str) -> List[List[str]]:
        # lexicographic order makes every shared prefix a contiguous run
        products = sorted(products)
        result = []
        prefix = ""
        for ch in searchWord:
            # grow the prefix one typed character at a time
            prefix += ch
            # lower bound: where the run of words >= prefix begins
            i = bisect_left(products, prefix)
            suggestions = []
            # first three of the run; stop at the first word not sharing the
            # prefix — the cost is independent of how many products match
            for word in products[i : i + 3]:
                if word.startswith(prefix):
                    suggestions.append(word)
                else:
                    break
            result.append(suggestions)
        return result
