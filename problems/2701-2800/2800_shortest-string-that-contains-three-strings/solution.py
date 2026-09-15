class Solution:
    def minimumString(self, a: str, b: str, c: str) -> str:
        # A word already contained in another never extends a superstring,
        # so it is dropped (duplicates collapse with it).
        words = list(dict.fromkeys((a, b, c)))
        words = [w for w in words if not any(w in t for t in words if t != w)]
        if len(words) == 1:
            return words[0]

        def merge(x: str, y: str) -> str:
            # Largest k whose x-suffix equals y's prefix; k = 0 (plain
            # concatenation) always works as the fallback.
            for k in range(min(len(x), len(y)), 0, -1):
                if x[-k:] == y[:k]:
                    return x + y[k:]
            return x + y

        best = ""
        for i in range(len(words)):
            for j in range(len(words)):
                if j == i:
                    continue
                # Chain the words in the order i -> j -> (the remaining one);
                # every optimal superstring lines up its words in some such
                # order with each pair joined on their full overlap.
                cur = merge(words[i], words[j])
                for k in range(len(words)):
                    if k != i and k != j:
                        cur = merge(cur, words[k])
                if not best or (len(cur), cur) < (len(best), best):
                    best = cur
        return best
