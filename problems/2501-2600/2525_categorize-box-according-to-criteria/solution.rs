impl Solution {
    pub fn categorize_box(length: i32, width: i32, height: i32, mass: i32) -> String {
        // Volume peaks at 10^15, far beyond i32 — widen each factor to
        // i64 before multiplying. Bulky means an oversized dimension or
        // an oversized volume; Heavy means the mass crossed 100.
        const BULK_DIM: i32 = 10_000;
        const BULK_VOLUME: i64 = 1_000_000_000;
        const HEAVY_MASS: i32 = 100;
        let volume = length as i64 * width as i64 * height as i64;
        let bulky = length >= BULK_DIM || width >= BULK_DIM || height >= BULK_DIM || volume >= BULK_VOLUME;
        let heavy = mass >= HEAVY_MASS;
        if bulky && heavy {
            return "Both".to_string();
        }
        if bulky {
            return "Bulky".to_string();
        }
        if heavy {
            return "Heavy".to_string();
        }
        "Neither".to_string()
    }
}
