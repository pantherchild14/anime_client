'use client';

import { AppDispatch, RootState } from '@/lib/hooks/store';
import { authSignUpAction } from '@/lib/hooks/user/signup/slice';
import { getCookie } from '@/lib/util/cookie';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

type Inputs = {
    username: string;
    email: string;
    password: string;
};

export default function SignUpForm() {
    const dispatch = useDispatch<AppDispatch>()
    const signup = useSelector((state: RootState) => state.signup)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const formData = new FormData();
        formData.append('username', data.username);
        formData.append('email', data.email);
        formData.append('password', data.password);

        try {
            dispatch(authSignUpAction.signupRequest(data));
        } catch (error) {
            console.error('Authentication failed', error);
        }
    };

    useEffect(() => {
        const existingToken = getCookie('access_token');
        if (existingToken) {
            dispatch(authSignUpAction.handleCheckToken(existingToken));
        }
    }, [dispatch]);

    useEffect(() => {
        if (signup.isLoggedIn) {
            redirect('/');
        }
    }, [signup.isLoggedIn, redirect]);

    return (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                    User Name
                </label>
                <div className="mt-2">
                    <input
                        id="username"
                        type="username"
                        placeholder="User Name"
                        autoComplete="username"
                        {...register('username', { required: true })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
            </div>
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
                <div className="mt-2">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                    </label>
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
                <div className="flex items-center justify-end">
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                        </a>
                    </div>
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
                    {isSubmitting ? 'Logging in...' : 'Sign Up'}
                </button>
            </div>
        </form>
    );
}
