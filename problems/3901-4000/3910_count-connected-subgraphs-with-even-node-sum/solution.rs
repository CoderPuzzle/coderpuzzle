impl Solution {
    pub fn even_sum_subgraphs(nums: Vec<i32>, edges: Vec<Vec<i32>>) -> i32 {
        let mut adjacency = vec![0u32; nums.len()];
        for edge in edges {
            let left = edge[0] as usize;
            let right = edge[1] as usize;
            adjacency[left] |= 1 << right;
            adjacency[right] |= 1 << left;
        }

        let mut answer = 0;
        for mask in 1u32..(1u32 << nums.len()) {
            let mut parity = 0;
            let mut bits = mask;
            while bits != 0 {
                let bit = bits & bits.wrapping_neg();
                parity ^= nums[bit.trailing_zeros() as usize];
                bits ^= bit;
            }
            if parity != 0 {
                continue;
            }

            let mut reached = mask & mask.wrapping_neg();
            let mut frontier = reached;
            while frontier != 0 {
                let mut neighbors = 0u32;
                bits = frontier;
                while bits != 0 {
                    let bit = bits & bits.wrapping_neg();
                    neighbors |= adjacency[bit.trailing_zeros() as usize];
                    bits ^= bit;
                }
                frontier = neighbors & mask & !reached;
                reached |= frontier;
            }
            if reached == mask {
                answer += 1;
            }
        }
        answer
    }
}
