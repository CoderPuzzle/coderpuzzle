impl Solution {
    pub fn suggested_products(products: Vec<String>, searchWord: String) -> Vec<Vec<String>> {
        // lexicographic order makes every shared prefix a contiguous run
        let mut sorted = products;
        sorted.sort();
        let mut result: Vec<Vec<String>> = Vec::new();
        let mut prefix = String::new();
        for ch in searchWord.chars() {
            // grow the prefix one typed character at a time
            prefix.push(ch);
            // lower bound: where the run of words >= prefix begins
            let start = sorted.partition_point(|w| w.as_str() < prefix.as_str());
            let mut suggestions: Vec<String> = Vec::new();
            // first three of the run; stop at the first word not sharing the
            // prefix — cost is independent of run length
            for w in sorted[start..].iter() {
                if suggestions.len() == 3 || !w.starts_with(prefix.as_str()) {
                    break;
                }
                suggestions.push(w.clone());
            }
            result.push(suggestions);
        }
        result
    }
}
