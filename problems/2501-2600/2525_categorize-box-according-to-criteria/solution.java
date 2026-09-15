class Solution {

    public String categorizeBox(int length, int width, int height, int mass) {
        // Volume peaks at 10^15, far beyond int range — widen the first
        // factor to long before multiplying. Bulky means an oversized
        // dimension or an oversized volume; Heavy means the mass crossed
        // 100.
        final int BULK_DIM = 10_000;
        final long BULK_VOLUME = 1_000_000_000L;
        final int HEAVY_MASS = 100;
        long volume = (long) length * width * height;
        boolean bulky = length >= BULK_DIM || width >= BULK_DIM || height >= BULK_DIM || volume >= BULK_VOLUME;
        boolean heavy = mass >= HEAVY_MASS;
        if (bulky && heavy) return "Both";
        if (bulky) return "Bulky";
        if (heavy) return "Heavy";
        return "Neither";
    }
}
