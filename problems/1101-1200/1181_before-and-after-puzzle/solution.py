class Solution:
    def beforeAndAfterPuzzles(self, phrases: List[str]) -> List[str]:
        # File every phrase position under its first word: the bucket a
        # predecessor will search by its own last word.
        by_first: dict[str, list[int]] = {}
        for idx, p in enumerate(phrases):
            by_first.setdefault(p.split(" ")[0], []).append(idx)

        results = set()
        for idx, p in enumerate(phrases):
            last = p.split(" ")[-1]
            for j in by_first.get(last, ()):
                if j == idx:
                    continue  # a phrase never pairs with its own position
                tail = phrases[j].split(" ")[1:]
                merged = p + " " + " ".join(tail) if tail else p
                results.add(merged)
        return sorted(results)
