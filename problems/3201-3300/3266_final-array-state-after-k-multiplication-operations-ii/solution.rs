use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn get_final_state(nums: Vec<i32>, mut k: i32, multiplier: i32) -> Vec<i32> {
        const MOD: i64 = 1_000_000_007;
        let n = nums.len();
        let mut result = vec![0i32; n];
        if multiplier == 1 {
            // x * 1 == x forever: no operation ever moves a value.
            let modulus = MOD as i32;
            for (slot, value) in result.iter_mut().zip(nums.iter()) {
                *slot = value % modulus;
            }
            return result;
        }
        let mut heap: BinaryHeap<Reverse<(i64, usize)>> =
            nums.iter().enumerate().map(|(i, &v)| Reverse((v as i64, i))).collect();
        let top = *nums.iter().max().unwrap() as i64;
        let m = multiplier as i64;
        // Simulate while the product stays within max(nums): every applied
        // value then lands at or below top, so top itself never grows and
        // each element is multiplied at most log2(top) times in this phase.
        while k > 0 {
            let &Reverse((smallest, _)) = heap.peek().unwrap();
            if smallest * m > top {
                break;
            }
            let Reverse((value, index)) = heap.pop().unwrap();
            heap.push(Reverse((value * m, index)));
            k -= 1;
        }
        if k > 0 {
            // Crossover reached: multiplying the smallest now lifts it above
            // everything else, so later operations cycle through the entries
            // in non-decreasing (value, index) order. Each round scales all
            // n values by the multiplier, which preserves that inequality,
            // so the leftover k operations split into q full rounds plus one
            // extra exponent for the first rem entries of the sorted order.
            let mut ordered: Vec<(i64, usize)> = heap.into_iter().map(|Reverse(pair)| pair).collect();
            ordered.sort();
            let q = (k as i64) / (n as i64);
            let rem = (k as usize) % n;
            for (pos, &(value, index)) in ordered.iter().enumerate() {
                let exponent = q + if pos < rem { 1 } else { 0 };
                result[index] = (value % MOD * pow_mod(m, exponent, MOD) % MOD) as i32;
            }
        } else {
            for Reverse((value, index)) in heap {
                result[index] = (value % MOD) as i32;
            }
        }
        result
    }
}

fn pow_mod(mut base: i64, mut exponent: i64, modulus: i64) -> i64 {
    let mut result = 1 % modulus;
    base %= modulus;
    while exponent > 0 {
        if exponent & 1 == 1 {
            result = result * base % modulus;
        }
        base = base * base % modulus;
        exponent >>= 1;
    }
    result
}
