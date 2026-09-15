var smallestEqual = function (nums) {
    for (let index = 0; index < nums.length; index++) {
        if (index % 10 === nums[index]) {
            return index;
        }
    }
    return -1;
};
