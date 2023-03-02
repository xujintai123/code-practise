

/*
 * @lc app=leetcode.cn id=55
 *
 * [55] 跳跃游戏
 *
 * https://leetcode.cn/problems/jump-game/
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/jump-game/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 示例:
 * 
 * 输入：nums = [2,3,1,1,4]
 * 输出：true
 * 解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。
 * 
 * 输入：nums = [3,2,1,0,4]
 * 输出：false
 * 解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。
 */

import { describe, expect, test } from '@jest/globals';

function canJump(nums: number[]): boolean {
    /* 当前可以抵达的最远位置 */
    let cover = nums[0];
    for (let i = 0; i <= cover; i++) {
        cover = Math.max(cover, i + nums[i]);
        if (cover >= nums.length - 1) return true;
    }

    return false;
};


describe('canJump module', () => {
    test('111', () => {
        expect(canJump([2, 3, 1, 1, 4])).toBe(true);
    });

    test('222', () => {
        expect(canJump([3, 2, 1, 0, 4])).toBe(false);
    });
});