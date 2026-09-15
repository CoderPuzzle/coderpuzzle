impl Solution {
    pub fn num_teams(rating: Vec<i32>) -> i32 {
        // Fix the middle soldier j: a rising team picks any smaller rating
        // on the left and any larger on the right; a falling team mirrors
        // it. Summing the four counts over every j counts each triple
        // exactly once, by its middle element.
        let n = rating.len();
        let mut teams = 0;
        for j in 0..n {
            let less_left = rating[..j].iter().filter(|value| **value < rating[j]).count() as i32;
            let greater_left = j as i32 - less_left;
            let greater_right = rating[j + 1..].iter().filter(|value| **value > rating[j]).count() as i32;
            let less_right = (n as i32 - 1 - j as i32) - greater_right;
            teams += less_left * greater_right + greater_left * less_right;
        }
        teams
    }
}
