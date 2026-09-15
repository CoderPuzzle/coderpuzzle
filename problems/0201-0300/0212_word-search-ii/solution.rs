use std::collections::{BTreeSet, HashMap};

#[derive(Default)]
struct TrieNode {
    children: HashMap<u8, TrieNode>,
    word: Option<String>,
}

impl Solution {
    pub fn find_words(board: Vec<Vec<String>>, words: Vec<String>) -> Vec<String> {
        let m = board.len();
        let n = board[0].len();
        // Trie of all words; a terminal node stores the whole word so it can
        // be recovered without rebuilding it letter by letter.
        let mut root = TrieNode::default();
        for word in &words {
            let mut node = &mut root;
            for &b in word.as_bytes() {
                node = node.children.entry(b).or_default();
            }
            node.word = Some(word.clone());
        }

        // Flatten the single-letter string cells into a plain byte grid.
        let grid: Vec<Vec<u8>> = board
            .iter()
            .map(|row| row.iter().map(|s| s.as_bytes()[0]).collect())
            .collect();

        // A cell is used at most once within a word (the seen grid tracks the
        // current path); the BTreeSet dedups words and yields sorted output.
        let mut found: BTreeSet<String> = BTreeSet::new();
        let mut seen = vec![vec![false; n]; m];
        let dirs: [(i64, i64); 4] = [(1, 0), (-1, 0), (0, 1), (0, -1)];
        // A word may begin anywhere, so start a DFS from every cell.
        for i in 0..m {
            for j in 0..n {
                Self::dfs(&grid, i as i64, j as i64, &root, &mut seen, &mut found, &dirs);
            }
        }
        found.into_iter().collect()
    }

    fn dfs(
        grid: &[Vec<u8>],
        i: i64,
        j: i64,
        node: &TrieNode,
        seen: &mut Vec<Vec<bool>>,
        found: &mut BTreeSet<String>,
        dirs: &[(i64, i64); 4],
    ) {
        let m = grid.len() as i64;
        let n = grid[0].len() as i64;
        let ch = grid[i as usize][j as usize];
        // Walk the trie in lockstep with board moves: a missing child rules
        // out the whole subtree of words with that prefix at once.
        let next = match node.children.get(&ch) {
            Some(t) => t,
            None => return,
        };
        if let Some(w) = &next.word {
            found.insert(w.clone());
        }
        seen[i as usize][j as usize] = true;
        for &(di, dj) in dirs {
            let ni = i + di;
            let nj = j + dj;
            if ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni as usize][nj as usize] {
                Self::dfs(grid, ni, nj, next, seen, found, dirs);
            }
        }
        // Unmark on the way out so the cell can serve other paths/words.
        seen[i as usize][j as usize] = false;
    }
}
