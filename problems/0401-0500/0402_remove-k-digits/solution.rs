impl Solution {
    pub fn remove_kdigits(num: String, k: i32) -> String {
        let bytes = num.as_bytes();
        let mut k = k as usize;
        let mut stack: Vec<u8> = Vec::with_capacity(bytes.len());
        for &ch in bytes {
            // A kept digit larger than the arriving one should go: a smaller
            // digit in a more significant position outweighs anything later.
            while k > 0 && !stack.is_empty() && *stack.last().unwrap() > ch {
                stack.pop();
                k -= 1;
            }
            stack.push(ch);
        }
        // Unspent removals mean the digits were non-decreasing; drop from the
        // end, where the largest digits sit.
        let keep = stack.len() - k;
        stack.truncate(keep);
        // Strip leading zeros; a fully consumed input yields "0", not "".
        let start = stack.iter().position(|&c| c != b'0');
        let result = match start {
            Some(i) => String::from_utf8(stack[i..].to_vec()).unwrap(),
            None => String::new(),
        };
        if result.is_empty() {
            "0".to_string()
        } else {
            result
        }
    }
}
