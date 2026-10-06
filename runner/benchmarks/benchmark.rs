fn main() {
    let mut accumulator: u32 = 0x12345678;
    for value in 0..3_000_000_u32 {
        accumulator = accumulator
            .wrapping_shl(5)
            .wrapping_sub(accumulator)
            .wrapping_add(value);
        std::hint::black_box(accumulator);
    }
    print!("{accumulator}");
}
