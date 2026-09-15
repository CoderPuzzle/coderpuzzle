impl Solution {
    // Four dotted decimal parts, or eight colon-separated hex groups: the
    // separator count is the first gate, and it settles queries that mix
    // both separators on sight — a valid address of either kind can never
    // contain the other kind's separator.
    pub fn valid_ip_address(query_ip: String) -> String {
        let parts: Vec<&str> = query_ip.split('.').collect();
        if parts.len() == 4 && parts.iter().all(|part| Self::ipv4_part(part)) {
            return "IPv4".to_string();
        }
        let parts: Vec<&str> = query_ip.split(':').collect();
        if parts.len() == 8 && parts.iter().all(|part| Self::ipv6_part(part)) {
            return "IPv6".to_string();
        }
        "Neither".to_string()
    }

    // 1-3 pure digits, no leading zero ("0" alone is the one way to write
    // zero), and a value of at most 255.
    fn ipv4_part(part: &str) -> bool {
        let bytes = part.as_bytes();
        if bytes.is_empty() || bytes.len() > 3 {
            return false;
        }
        let mut value = 0u32;
        for &b in bytes {
            if !b.is_ascii_digit() {
                return false;
            }
            value = value * 10 + u32::from(b - b'0');
        }
        value <= 255 && !(bytes.len() > 1 && bytes[0] == b'0')
    }

    // 1-4 characters of hex, either case; leading zeros are allowed.
    fn ipv6_part(part: &str) -> bool {
        let bytes = part.as_bytes();
        !bytes.is_empty() && bytes.len() <= 4 && bytes.iter().all(|b| b.is_ascii_hexdigit())
    }
}
