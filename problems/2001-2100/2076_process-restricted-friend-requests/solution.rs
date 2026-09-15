impl Solution {
    pub fn friend_requests(n: i32, restrictions: Vec<Vec<i32>>, requests: Vec<Vec<i32>>) -> Vec<bool> {
        let mut parent: Vec<usize> = (0..n as usize).collect();
        let mut size = vec![1usize; n as usize];

        fn find(parent: &mut [usize], mut node: usize) -> usize {
            while parent[node] != node {
                parent[node] = parent[parent[node]];
                node = parent[node];
            }
            node
        }

        let mut answer = Vec::with_capacity(requests.len());
        for request in requests {
            let mut root_u = find(&mut parent, request[0] as usize);
            let mut root_v = find(&mut parent, request[1] as usize);
            let mut allowed = true;
            for restriction in &restrictions {
                let root_x = find(&mut parent, restriction[0] as usize);
                let root_y = find(&mut parent, restriction[1] as usize);
                if (root_x == root_u && root_y == root_v) || (root_x == root_v && root_y == root_u) {
                    allowed = false;
                    break;
                }
            }

            answer.push(allowed);
            if allowed && root_u != root_v {
                if size[root_u] < size[root_v] {
                    std::mem::swap(&mut root_u, &mut root_v);
                }
                parent[root_v] = root_u;
                size[root_u] += size[root_v];
            }
        }
        answer
    }
}
