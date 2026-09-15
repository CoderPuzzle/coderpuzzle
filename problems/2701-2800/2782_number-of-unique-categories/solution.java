class Solution {

    public int numberOfCategories(CategoryHandler categoryHandler, int n) {
        // Keep one representative index per category discovered so far.
        // Same-category is an equivalence relation behind the oracle, so
        // by transitivity element i shares a category with some earlier
        // element exactly when it shares one with that category's
        // representative: scanning representatives only never misses a
        // join and never invents one. A miss across all representatives
        // means i opens a genuinely new category and becomes its
        // representative; at most i queries are spent on element i, so
        // the whole sweep stays within n(n-1)/2 calls.
        int[] representatives = new int[n];
        int count = 0;
        for (int i = 0; i < n; i++) {
            boolean joined = false;
            for (int r = 0; r < count; r++) {
                if (categoryHandler.haveSameCategory(i, representatives[r])) {
                    joined = true;
                    break;
                }
            }
            if (!joined) {
                representatives[count++] = i;
            }
        }
        return count;
    }
}
