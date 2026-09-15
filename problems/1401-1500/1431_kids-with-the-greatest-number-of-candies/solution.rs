impl Solution {
    pub fn kids_with_candies(candies: Vec<i32>, extra_candies: i32) -> Vec<bool> {
        let maximum = *candies.iter().max().unwrap();
        candies.iter().map(|&count| count + extra_candies >= maximum).collect()
    }
}
