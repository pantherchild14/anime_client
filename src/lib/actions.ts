'use server';

export async function SignInAuthenticate(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        console.log('credentials action login form data', { email, password });

        return { message: 'Authentication successful' };
    } catch (error) {
        console.error('Authentication failed', error);
        throw new Error('Authentication failed');
    }
}

export async function SignUpAuthenticate(formData: FormData) {
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        console.log('credentials action login form data', { username, email, password });

        return { message: 'Authentication successful' };
    } catch (error) {
        console.error('Authentication failed', error);
        throw new Error('Authentication failed');
    }
}
