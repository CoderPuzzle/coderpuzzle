impl Solution {
    pub fn validate_stack_sequences(pushed: Vec<i32>, popped: Vec<i32>) -> bool {
        // The stack machine has almost no choices. While the top of the
        // working stack differs from the next value popped still wants, the
        // wanted value is either not pushed yet — pushing is the only way it
        // can ever reach the top — or it sits buried under elements pushed
        // after it that are still unpopped, and no continuation can fix that.
        // The moment the tops agree, popping is forced too. So a single
        // left-to-right replay — push each element, then pop while the top
        // matches — is exhaustive, and the pair is real exactly when the
        // replay consumes all of popped.
        let mut stack: Vec<i32> = Vec::new();
        let mut j = 0;
        for &value in &pushed {
            stack.push(value);
            while j < popped.len() && stack.last() == Some(&popped[j]) {
                stack.pop();
                j += 1;
            }
        }
        j == popped.len()
    }
}
