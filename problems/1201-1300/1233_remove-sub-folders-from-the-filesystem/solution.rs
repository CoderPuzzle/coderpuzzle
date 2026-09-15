impl Solution {
    pub fn remove_subfolders(mut folder: Vec<String>) -> Vec<String> {
        folder.sort();
        let mut out: Vec<String> = Vec::new();
        for path in folder {
            // The slash separates a true child ("/a" + "/") from a longer
            // sibling sharing the name prefix ("/ab" vs "/a/").
            let keep = match out.last() {
                Some(kept) => !path.starts_with(&format!("{kept}/")),
                None => true,
            };
            if keep {
                out.push(path);
            }
        }
        out
    }
}
