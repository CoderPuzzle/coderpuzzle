class Solution {
  public:
    string categorizeBox(int length, int width, int height, int mass) {
        // Volume peaks at 10^15, far beyond int range — widen the first
        // factor to long long before multiplying. Bulky means an
        // oversized dimension or an oversized volume; Heavy means the
        // mass crossed 100.
        const int BULK_DIM = 10'000;
        const long long BULK_VOLUME = 1'000'000'000LL;
        const int HEAVY_MASS = 100;
        long long volume = (long long)length * width * height;
        bool bulky = length >= BULK_DIM || width >= BULK_DIM || height >= BULK_DIM || volume >= BULK_VOLUME;
        bool heavy = mass >= HEAVY_MASS;
        if (bulky && heavy)
            return "Both";
        if (bulky)
            return "Bulky";
        if (heavy)
            return "Heavy";
        return "Neither";
    }
};
