'use client';

import { AppDispatch, RootState } from '@/lib/hooks/store';
import { authLoginAction } from '@/lib/hooks/user/login/slice';
import { getCookie } from '@/lib/util/cookie';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const dispatch = useDispatch<AppDispatch>()
    const login = useSelector((state: RootState) => state.login)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            dispatch(authLoginAction.loginRequest(data));
        } catch (error) {
            console.error('Authentication failed', error);
        }
    };

    useEffect(() => {
        const existingToken = getCookie('access_token');
        if (existingToken) {
            dispatch(authLoginAction.handleCheckLogin(existingToken));
        }
    }, [dispatch]);

    useEffect(() => {
        if (login.isLoggedIn) {
            redirect('/');
        }
    }, [login.isLoggedIn, redirect]);

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        {...register('email', { required: true })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('password', { required: true })}
                    />
                </div>
            </div>

            {/* {errors.email && <p>Email is required</p>}
            {errors.password && <p>Password is required</p>} */}
            <div>
                <button
                    aria-disabled={isSubmitting}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {isSubmitting ? 'Logging in...' : 'Sign In'}
                </button>
            </div>
        </form>
    );
}
