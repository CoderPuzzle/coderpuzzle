class Solution {

    public boolean validateStackSequences(int[] pushed, int[] popped) {
        // The stack machine has almost no choices. While the top of the
        // working stack differs from the next value popped still wants, the
        // wanted value is either not pushed yet — pushing is the only way it
        // can ever reach the top — or it sits buried under elements pushed
        // after it that are still unpopped, and no continuation can fix that.
        // The moment the tops agree, popping is forced too. So a single
        // left-to-right replay — push each element, then pop while the top
        // matches — is exhaustive, and the pair is real exactly when the
        // replay consumes all of popped.
        int[] stack = new int[pushed.length];
        int top = 0;
        int j = 0;
        for (int value : pushed) {
            stack[top++] = value;
            while (top > 0 && j < popped.length && stack[top - 1] == popped[j]) {
                top--;
                j++;
            }
        }
        return j == popped.length;
    }
}
