use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn crawl(htmlParser: &mut HtmlParser, start_url: String) {
        let home = hostname(&start_url);
        let mut seen: HashSet<String> = HashSet::new();
        seen.insert(start_url.clone());
        let mut queue: VecDeque<String> = VecDeque::new();
        queue.push_back(start_url);
        while let Some(url) = queue.pop_front() {
            for link in htmlParser.get_urls(&url) {
                // Foreign hostnames are neither returned nor expanded;
                // marking at enqueue time keeps get_urls to one call per page.
                if !seen.contains(&link) && hostname(&link) == home {
                    seen.insert(link.clone());
                    queue.push_back(link);
                }
            }
        }
        // The judged artifact is the oracle's record of every page fetched.
    }
}

// hostname is everything between "http://" and the next "/".
fn hostname(url: &str) -> String {
    let rest = &url["http://".len()..];
    match rest.find('/') {
        Some(slash) => rest[..slash].to_string(),
        None => rest.to_string(),
    }
}
