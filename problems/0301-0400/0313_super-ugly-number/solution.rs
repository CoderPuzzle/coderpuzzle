impl Solution {
    pub fn nth_super_ugly_number(n: i32, primes: Vec<i32>) -> i32 {
        // Every super ugly number past 1 is a listed prime times a smaller
        // one, so build the sequence in order: one pointer per prime into
        // the built prefix, plus its cached candidate primes[p] * ugly[index[p]].
        // The next value is the smallest candidate; advancing EVERY pointer
        // whose candidate hit that minimum keeps duplicates (6 = 2 * 3 = 3 * 2)
        // out of the sequence. Candidates are i64: they overshoot the
        // 32-bit-fitting answer by up to one factor of the largest prime.
        let n = n as usize;
        let k = primes.len();
        let mut ugly = vec![1i64; n];
        let mut candidate: Vec<i64> = primes.iter().map(|&p| p as i64).collect();
        let mut index = vec![0usize; k];
        for i in 1..n {
            let next = *candidate.iter().min().unwrap();
            ugly[i] = next;
            for p in 0..k {
                if candidate[p] == next {
                    index[p] += 1;
                    candidate[p] = primes[p] as i64 * ugly[index[p]];
                }
            }
        }
        ugly[n - 1] as i32
    }
}
