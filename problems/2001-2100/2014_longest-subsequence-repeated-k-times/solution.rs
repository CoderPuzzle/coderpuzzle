impl Solution {
    pub fn longest_subsequence_repeated_k(s: String, k: i32) -> String {
        fn repeated(source: &[u8], candidate: &[u8], repetitions: i32) -> bool {
            let mut matched = 0usize;
            let mut completed = 0;
            for &character in source {
                if character == candidate[matched] {
                    matched += 1;
                    if matched == candidate.len() {
                        completed += 1;
                        if completed == repetitions {
                            return true;
                        }
                        matched = 0;
                    }
                }
            }
            false
        }

        fn search(source: &[u8], repetitions: i32, quotas: &mut [i32; 26], candidate: &mut String, best: &mut String) {
            if candidate.len() > best.len() || (candidate.len() == best.len() && candidate.as_str() > best.as_str()) {
                *best = candidate.clone();
            }

            for index in (0..26).rev() {
                if quotas[index] == 0 {
                    continue;
                }
                quotas[index] -= 1;
                candidate.push((b'a' + index as u8) as char);
                if repeated(source, candidate.as_bytes(), repetitions) {
                    search(source, repetitions, quotas, candidate, best);
                }
                candidate.pop();
                quotas[index] += 1;
            }
        }

        let mut quotas = [0i32; 26];
        for &character in s.as_bytes() {
            quotas[(character - b'a') as usize] += 1;
        }
        for quota in &mut quotas {
            *quota /= k;
        }

        let mut candidate = String::new();
        let mut best = String::new();
        search(s.as_bytes(), k, &mut quotas, &mut candidate, &mut best);
        best
    }
}
