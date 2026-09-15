class ProductOfNumbers {

    private long[] prefix = new long[16];
    private int size = 1; // prefix[0] is the sentinel 1

    public ProductOfNumbers() {
        prefix[0] = 1;
    }

    public void add(int num) {
        if (num == 0) {
            size = 1; // the sentinel survives; every older product is void
            return;
        }
        if (size == prefix.length) {
            long[] grown = new long[prefix.length * 2];
            System.arraycopy(prefix, 0, grown, 0, size);
            prefix = grown;
        }
        prefix[size] = prefix[size - 1] * num;
        size += 1;
    }

    public int getProduct(int k) {
        if (k >= size) {
            return 0; // the window reaches back past a zero
        }
        long product = prefix[size - 1] / prefix[size - 1 - k];
        return (int) product;
    }
}
