import { notification } from "antd";
import { useEffect, useRef, useCallback } from 'react';

/**
 * 平滑的滚动
 */
export function scrollToTop() {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

// 处理服务器响应的提示
export function success(data) {
    console.log(data, 'data')
    try {
        if (data.code !== 200) {
            notification.error({
                message: 'An error has occured',
                description: data.data.msg,
                placement: 'bottomRight',
            })
            // Modal.error({ content: data.data.message });
            return false;
        }
        return true;
    } catch (e) {
        notification.error({
            message: 'An error has occured',
            description: 'Refresh the page and try again',
            placement: 'bottomRight',
        })
    }
}

// 防抖动
export function useDebounce(fn, delay, dep = []) {
    const { current } = useRef({ fn, timer: null });
    useEffect(() => {
      current.fn = fn;
    }, [current, current.fn, fn]);
  
    return useCallback((...args) => {
      if (current.timer) {
        clearTimeout(current.timer);
      }
      current.timer = setTimeout(() => {
        current.fn.call(this, ...args);
      }, delay);
    }, [current, delay])
  }
