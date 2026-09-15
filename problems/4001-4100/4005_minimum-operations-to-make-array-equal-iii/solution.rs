use std::collections::HashMap;

impl Solution {
    pub fn min_operations(nums: Vec<i32>) -> i32 {
        let n = nums.len() as i64;
        // Value -> multiplicity; already uniform (covers n = 1 and the
        // all-ones array) means nothing has to move.
        let mut freq: HashMap<i32, i64> = HashMap::new();
        for &v in &nums {
            *freq.entry(v).or_insert(0) += 1;
        }
        if freq.len() == 1 {
            return 0;
        }

        // Sieve once to sqrt(1e9); every value factors through these primes.
        const LIMIT: usize = 31623;
        let mut composite = vec![false; LIMIT + 1];
        let mut primes: Vec<i64> = Vec::new();
        for i in 2..=LIMIT {
            if !composite[i] {
                primes.push(i as i64);
                let mut j = i * i;
                while j <= LIMIT {
                    composite[j] = true;
                    j += i;
                }
            }
        }

        let factorize = |v: i64| -> Vec<(i64, i64)> {
            let mut v = v;
            let mut fac = Vec::new();
            for &p in &primes {
                if p * p > v {
                    break;
                }
                if v % p == 0 {
                    let mut e = 0i64;
                    while v % p == 0 {
                        v /= p;
                        e += 1;
                    }
                    fac.push((p, e));
                }
            }
            if v > 1 {
                fac.push((v, 1));
            }
            fac
        };
        let divisors = |fac: &[(i64, i64)]| -> Vec<i64> {
            let mut ds = vec![1i64];
            for &(p, e) in fac {
                let size = ds.len();
                let mut power = 1i64;
                for _ in 0..e {
                    power *= p;
                    for i in 0..size {
                        ds.push(ds[i] * power);
                    }
                }
            }
            ds
        };

        let facs: Vec<(i32, Vec<(i64, i64)>)> = freq.keys().map(|&v| (v, factorize(v as i64))).collect();

        // multipleCount[d] = number of elements divisible by d, folded by
        // frequency over every distinct value's divisor set.
        let mut multiple_count: HashMap<i64, i64> = HashMap::new();
        for &(v, ref fac) in &facs {
            for d in divisors(fac) {
                *multiple_count.entry(d).or_insert(0) += freq[&v];
            }
        }

        // A target absent from nums costs at least one operation per element
        // (>= n total), while the lcm costs at most n (every element divides
        // it in one op), so the optimum sits at a present value > 1 or at the
        // lcm itself. Track the lcm only until it outgrows any element.
        let mut lcm = 1i64;
        let mut capped = false;
        for &v in freq.keys() {
            lcm = lcm / gcd(lcm, v as i64) * v as i64;
            if lcm > 1_000_000_000 {
                capped = true;
                break;
            }
        }
        let mut best = match (!capped).then(|| freq.get(&(lcm as i32))).flatten() {
            Some(&f) => n - f,
            None => n,
        };

        // For a target x > 1 an element equal to x pays 0, one dividing x or
        // divisible by x pays 1, anything else pays 2 (multiply by x, then
        // divide by v). Both comparable sets contain the equals, so folding
        // them in full gives cost = 2n - dd - dv with no double charge.
        for &(x, ref fac) in &facs {
            if x == 1 {
                continue;
            }
            let mut dd = 0i64;
            for d in divisors(fac) {
                if let Some(&f) = freq.get(&(d as i32)) {
                    dd += f;
                }
            }
            let cost = 2 * n - dd - multiple_count[&(x as i64)];
            if cost < best {
                best = cost;
            }
        }
        best as i32
    }
}

fn gcd(a: i64, b: i64) -> i64 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}
