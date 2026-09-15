class Bitset {

    // A bit array plus a lazy orientation flag. The stored boolean always
    // means "effective bit XOR flag", so fix/unfix complement their write
    // while the set is flipped, flip() only toggles the flag and
    // re-derives ones as size - ones, and all/one/count just read the
    // counter. toString is the one place every bit passes through the
    // flag again.
    private final boolean[] bits;
    private boolean flipped;
    private int ones;

    public Bitset(int size) {
        bits = new boolean[size];
    }

    public void fix(int idx) {
        if (bits[idx] == flipped) {
            bits[idx] = !flipped;
            ones++;
        }
    }

    public void unfix(int idx) {
        if (bits[idx] != flipped) {
            bits[idx] = flipped;
            ones--;
        }
    }

    public void flip() {
        flipped = !flipped;
        ones = bits.length - ones;
    }

    public boolean all() {
        return ones == bits.length;
    }

    public boolean one() {
        return ones > 0;
    }

    public int count() {
        return ones;
    }

    public String toString() {
        StringBuilder composition = new StringBuilder(bits.length);
        for (boolean bit : bits) {
            composition.append(bit != flipped ? '1' : '0');
        }
        return composition.toString();
    }
}
