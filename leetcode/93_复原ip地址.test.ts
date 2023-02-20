

/*
 * @lc app=leetcode.cn id=93
 *
 * [93] 复原 IP 地址
 *
 * https://leetcode.cn/problems/restore-ip-addresses/
 *
 * 有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

 *  例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
 *  给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/restore-ip-addresses
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 示例:
 * 
 * 输入：s = "25525511135"
 * 输出：["255.255.11.135","255.255.111.35"]
 * 
 */

import { describe, expect, test } from '@jest/globals';

function restoreIpAddresses(s: string): string[] {
    if (s.length > 12 || s.length < 4) return [];

    let res: string[] = [], container: string[] = [];

    function backtracking(start: number) {
        const deep = container.length;

        if (deep === 4 && start === s.length) {
            res.push(container.slice().join('.'));
            return;
        }

        /* 剪枝 */
        /* 添加了四个整数，如果字符串还有剩余，则跳过 */
        if (deep >= 4) return;

        /* 剪枝：可遍历最大宽度 不能大于（s.length - （4 - 当前层数 - 1）; 不能大于 start + 3 */
        const length = s.length - 3 + deep > start + 3 ? start + 3 : s.length - 3 + deep;
        for (let i = start; i < length; i++) {
            const str = s.slice(start, i + 1);
            if (isValid(str)) {
                container.push(str);
                backtracking(i + 1);
                container.pop();
            }
        }
    }

    function isValid(str: string) {
        /* 大于255 */
        if (Number(str) > 255 || str.length > 3) return false;
        /* 含有前导0 */
        if (str[0] === '0' && str.length > 1) return false;

        return true;
    }

    backtracking(0);

    return res;
};


describe('restoreIpAddresses module', () => {
    test('0000 toEqual ["0.0.0.0"]', () => {
        expect(restoreIpAddresses('0000')).toEqual(["0.0.0.0"]);
    });

    test('25525511135 toEqual ["255.255.11.135","255.255.111.35"]', () => {
        expect(restoreIpAddresses('25525511135')).toEqual(["255.255.11.135","255.255.111.35"]);
    });

    test('101023 toEqual ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]', () => {
        expect(restoreIpAddresses('101023')).toEqual(["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]);
    });
});