

/*
 * @lc app=leetcode.cn id=45
 *
 * [45] 跳跃游戏 II
 *
 * https://leetcode.cn/problems/jump-game-ii/
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/jump-game-ii
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/jump-game-ii/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 示例:
 * 
 * 输入：nums = [2,3,1,1,4]
 * 输出：2
 * 解释：跳到最后一个位置的最小跳跃数是 2。从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
 * 
 * 输入：nums = [2,3,0,1,4]
 * 输出：2
 */

import { describe, expect, test } from '@jest/globals';

function jump(nums: number[]): number {
    /* 需要跳跃的位置 */
    let start = 0;
    let longest = start, count = 0;

    /* i 最大值为 nums.length - 2， 也就是倒数第二位（如果 i 取到 nums.length - 1，那么到达终点以后还会加一步） */
    for (let i = 0; i < nums.length - 1; i++) {
        /* 不断计算当前位置可以到达的最远距离（后续作为最新一步的起始位置） */
        longest = Math.max(longest, nums[i] + i);

        /* 到达需要跳跃的位置，跳跃一次 */
        if (i === start) {
            count++;
            /* 跳跃到可跳跃的最远位置*/
            start = longest;
        }
    }

    return count;
};


describe('jump module', () => {
    test('111', () => {
        expect(jump([2, 3, 1, 1, 4])).toBe(2);
    });

    test('222', () => {
        expect(jump([2, 3, 0, 1, 4])).toBe(2);
    });
});