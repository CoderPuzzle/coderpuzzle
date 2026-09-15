class ATM {

    private static final long[] DENOMS = { 20, 50, 100, 200, 500 };
    private final long[] counts;

    public ATM() {
        counts = new long[5];
    }

    public void deposit(long[] banknotesCount) {
        for (int i = 0; i < 5; i++) {
            counts[i] += banknotesCount[i];
        }
    }

    public long[] withdraw(long amount) {
        long[] taken = new long[5];
        long remaining = amount;
        for (int i = 4; i >= 0; i--) {
            long take = Math.min(counts[i], remaining / DENOMS[i]);
            taken[i] = take;
            remaining -= take * DENOMS[i];
        }
        if (remaining != 0) {
            return new long[] { -1 };
        }
        for (int i = 0; i < 5; i++) {
            counts[i] -= taken[i];
        }
        return taken;
    }
}
