class Solution:
    def numberOfCategories(self, categoryHandler: CategoryHandler, n: int) -> int:
        # Keep one representative index per category discovered so far.
        # Same-category is an equivalence relation behind the oracle, so
        # by transitivity element i shares a category with some earlier
        # element exactly when it shares one with that category's
        # representative: scanning representatives only never misses a
        # join and never invents one. A miss across all representatives
        # means i opens a genuinely new category and becomes its
        # representative; at most i queries are spent on element i, so
        # the whole sweep stays within n(n-1)/2 calls.
        representatives: list[int] = []
        for i in range(n):
            for rep in representatives:
                if categoryHandler.haveSameCategory(i, rep):
                    break
            else:
                representatives.append(i)
        return len(representatives)
