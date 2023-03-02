

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

function fib(n: number): number {
    /* 暴力 耗时长 */
    // if (n < 2) return n;
    // return fib(n - 1) + fib(n - 2);

    if (n < 2) return n;

    /* 滚动数组优化 */
    let dp = [0, 1];

    /* 要计算前n项（坐标为 n - 1）的合， 所以需要遍历到坐标n */
    for (let i = 2; i <= n; i++) {
        const sum = dp[0] + dp[1];
        dp[0] = dp[1];
        dp[1] = sum;
    }

    return dp[1];
};


describe('fib module', () => {
    test('111', () => {
        expect(fib(2)).toBe(1);
    });


    test('222', () => {
        expect(fib(3)).toBe(2);
    });

    test('333', () => {
        expect(fib(4)).toBe(3);
    });
});