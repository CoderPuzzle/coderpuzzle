// Two pointers eat the array from both ends; every round folds
// first * 10^digits(last) + last into the running value. This is exactly
// concat(first, last) without any string round-trip. Even at the constraint
// maximum (~500 rounds of 5-digit concatenations) the total stays under
// 5*10^10 << 2^53, so plain numbers are exact.
function findTheArrayConcVal(nums: number[]): number {
    let answer = 0;
    let left = 0;
    let right = nums.length - 1;
    while (left < right) {
        // Peel decimal digits off the last element to build the shift
        // factor the concatenation needs.
        let scale = 10;
        let tail = nums[right];
        while (tail >= 10) {
            tail = Math.floor(tail / 10);
            scale *= 10;
        }
        answer += nums[left] * scale + nums[right];
        left++;
        right--;
    }
    // Odd length: the surviving middle element joins the total alone.
    if (left === right) answer += nums[left];
    return answer;
}
