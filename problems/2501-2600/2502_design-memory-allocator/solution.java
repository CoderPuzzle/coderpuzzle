class Allocator {

    // Flat cell array holding each unit's mID (0 = free). allocate
    // linear-scans runs of free cells for the leftmost fit; freeMemory
    // sweeps the same array once, zeroing every match.
    private final int[] units;

    public Allocator(int n) {
        units = new int[n];
    }

    public int allocate(int size, int mID) {
        int i = 0;
        while (i < units.length) {
            if (units[i] != 0) {
                ++i;
                continue;
            }
            int j = i;
            while (j < units.length && units[j] == 0) ++j;
            if (j - i >= size) {
                for (int k = i; k < i + size; ++k) units[k] = mID;
                return i;
            }
            i = j;
        }
        return -1;
    }

    public int freeMemory(int mID) {
        int freed = 0;
        for (int k = 0; k < units.length; ++k) {
            if (units[k] == mID) {
                units[k] = 0;
                ++freed;
            }
        }
        return freed;
    }
}
