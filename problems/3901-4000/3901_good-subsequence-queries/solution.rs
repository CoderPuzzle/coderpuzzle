impl Solution {
    pub fn count_good_subseq(mut nums: Vec<i32>, p: i32, queries: Vec<Vec<i32>>) -> i32 {
        const LIMIT: usize = 50000;
        let n = nums.len();
        let mut smallest: Vec<usize> = (0..=LIMIT).collect();
        for value in 2..=223 {
            if smallest[value] == value {
                for multiple in (value * value..=LIMIT).step_by(value) {
                    if smallest[multiple] == multiple {
                        smallest[multiple] = value;
                    }
                }
            }
        }
        fn factors(mut value: usize, smallest: &[usize]) -> Vec<usize> {
            let mut result = Vec::new();
            while value > 1 {
                let prime = smallest[value];
                result.push(prime);
                while value % prime == 0 {
                    value /= prime;
                }
            }
            result
        }

        let mut counts = vec![0usize; LIMIT + 1];
        let mut covered_xor = vec![0usize; LIMIT + 1];
        let mut histogram = vec![0usize; n + 1];
        let mut forbidden = vec![0usize; n];
        let all_xor = (0..n).fold(0, |acc, index| acc ^ index);
        let mut forbidden_distinct = 0usize;
        let mut active = 0usize;

        fn adjust(
            prime: usize,
            index: usize,
            delta: isize,
            n: usize,
            all_xor: usize,
            counts: &mut [usize],
            covered_xor: &mut [usize],
            histogram: &mut [usize],
            forbidden: &mut [usize],
            forbidden_distinct: &mut usize,
        ) {
            let mut count = counts[prime];
            if count == n - 1 {
                let missing = all_xor ^ covered_xor[prime];
                forbidden[missing] -= 1;
                if forbidden[missing] == 0 {
                    *forbidden_distinct -= 1;
                }
            }
            if count > 0 {
                histogram[count] -= 1;
            }
            counts[prime] = (counts[prime] as isize + delta) as usize;
            covered_xor[prime] ^= index;
            count = counts[prime];
            if count > 0 {
                histogram[count] += 1;
            }
            if count == n - 1 {
                let missing = all_xor ^ covered_xor[prime];
                if forbidden[missing] == 0 {
                    *forbidden_distinct += 1;
                }
                forbidden[missing] += 1;
            }
        }

        for index in 0..n {
            if nums[index] % p == 0 {
                active += 1;
                for prime in factors((nums[index] / p) as usize, &smallest) {
                    adjust(
                        prime,
                        index,
                        1,
                        n,
                        all_xor,
                        &mut counts,
                        &mut covered_xor,
                        &mut histogram,
                        &mut forbidden,
                        &mut forbidden_distinct,
                    );
                }
            }
        }
        let mut answer = 0;
        for query in queries {
            let index = query[0] as usize;
            let value = query[1];
            if nums[index] % p == 0 {
                for prime in factors((nums[index] / p) as usize, &smallest) {
                    adjust(
                        prime,
                        index,
                        -1,
                        n,
                        all_xor,
                        &mut counts,
                        &mut covered_xor,
                        &mut histogram,
                        &mut forbidden,
                        &mut forbidden_distinct,
                    );
                }
                active -= 1;
            }
            nums[index] = value;
            if value % p == 0 {
                active += 1;
                for prime in factors((value / p) as usize, &smallest) {
                    adjust(
                        prime,
                        index,
                        1,
                        n,
                        all_xor,
                        &mut counts,
                        &mut covered_xor,
                        &mut histogram,
                        &mut forbidden,
                        &mut forbidden_distinct,
                    );
                }
            }
            if active > 0
                && ((active < n && histogram[active] == 0)
                    || (active == n && histogram[n] == 0 && forbidden_distinct < n))
            {
                answer += 1;
            }
        }
        answer
    }
}
