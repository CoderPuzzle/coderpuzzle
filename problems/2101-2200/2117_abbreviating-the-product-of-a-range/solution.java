class Solution {

    public String abbreviateProduct(int left, int right) {
        long modulus = 10_000_000_000L;
        double logarithm = 0.0;
        int twos = 0;
        int fives = 0;
        long suffix = 1;

        for (int value = left; value <= right; value++) {
            logarithm += Math.log10(value);
            int remaining = value;
            while (remaining % 2 == 0) {
                twos++;
                remaining /= 2;
            }
            while (remaining % 5 == 0) {
                fives++;
                remaining /= 5;
            }
            suffix = (suffix * remaining) % modulus;
        }

        int zeros = Math.min(twos, fives);
        for (int count = zeros; count < twos; count++) {
            suffix = (suffix * 2) % modulus;
        }
        for (int count = zeros; count < fives; count++) {
            suffix = (suffix * 5) % modulus;
        }

        double adjustedLogarithm = logarithm - zeros;
        int digits = (int) Math.floor(adjustedLogarithm) + 1;
        if (digits <= 10) {
            return suffix + "e" + zeros;
        }

        double fractional = adjustedLogarithm - Math.floor(adjustedLogarithm);
        int prefix = (int) Math.floor(Math.pow(10, fractional + 4));
        return prefix + "..." + String.format("%05d", suffix % 100_000) + "e" + zeros;
    }
}
