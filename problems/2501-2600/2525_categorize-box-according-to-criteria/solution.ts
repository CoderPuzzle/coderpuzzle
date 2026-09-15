function categorizeBox(length: number, width: number, height: number, mass: number): string {
    // Volume peaks at 10^5 cubed = 10^15 < 2^53 (~9.0 x 10^15), so the
    // Number product is exact and no widening trick is needed. Bulky
    // means an oversized dimension or an oversized volume; Heavy means
    // the mass crossed 100.
    const BULK_DIM = 10000;
    const BULK_VOLUME = 1e9;
    const HEAVY_MASS = 100;
    const bulky =
        length >= BULK_DIM || width >= BULK_DIM || height >= BULK_DIM || length * width * height >= BULK_VOLUME;
    const heavy = mass >= HEAVY_MASS;
    if (bulky && heavy) return "Both";
    if (bulky) return "Bulky";
    if (heavy) return "Heavy";
    return "Neither";
}
