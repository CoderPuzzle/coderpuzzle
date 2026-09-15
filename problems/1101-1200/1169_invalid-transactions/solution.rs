impl Solution {
    pub fn invalid_transactions(transactions: Vec<String>) -> Vec<String> {
        let n = transactions.len();
        let parsed: Vec<Vec<&str>> = transactions.iter().map(|t| t.split(',').collect()).collect();
        let mut flags = vec![false; n];
        // An amount over the limit convicts on its own; otherwise the
        // transaction waits for a same-name partner in another city within
        // 60 minutes — which may appear anywhere in the array.
        for i in 0..n {
            if parsed[i][2].parse::<i64>().unwrap() > 1000 {
                flags[i] = true;
                continue;
            }
            let time_i: i64 = parsed[i][1].parse().unwrap();
            for j in 0..n {
                if i == j || parsed[j][0] != parsed[i][0] || parsed[j][3] == parsed[i][3] {
                    continue;
                }
                let time_j: i64 = parsed[j][1].parse().unwrap();
                if (time_i - time_j).abs() <= 60 {
                    flags[i] = true;
                    break;
                }
            }
        }
        (0..n).filter(|&i| flags[i]).map(|i| transactions[i].clone()).collect()
    }
}
