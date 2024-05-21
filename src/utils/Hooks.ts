import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useLocation } from 'react-router-dom';
import { getToken } from '../utils/request/auth';

// 在整个应用程序中使用，而不是简单的 `useDispatch` 和 `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
* 自定义hooks用于获取路由参数
* IE11及以下浏览器 不支持浏览器内置的URLSearchParams API
**/
export const useQuery = (i: string) => {
    let query = new URLSearchParams(useLocation().search);
    return query.get(i)
}

export const useGetToken = () => {
    const token = useAppSelector((state) => state.user.token)
    if (getToken() || token) {
        return true
    } else {
        return false
    }
}