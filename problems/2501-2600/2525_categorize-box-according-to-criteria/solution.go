func categorizeBox(length int, width int, height int, mass int) string {
	// Volume peaks at 10^15, far beyond int32 — widen each factor to
	// int64 before multiplying. Bulky means an oversized dimension or an
	// oversized volume; Heavy means the mass crossed 100.
	const BULK_DIM = 10000
	const BULK_VOLUME = 1_000_000_000
	const HEAVY_MASS = 100
	volume := int64(length) * int64(width) * int64(height)
	bulky := length >= BULK_DIM || width >= BULK_DIM || height >= BULK_DIM ||
		volume >= BULK_VOLUME
	heavy := mass >= HEAVY_MASS
	if bulky && heavy {
		return "Both"
	}
	if bulky {
		return "Bulky"
	}
	if heavy {
		return "Heavy"
	}
	return "Neither"
}
