import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { loginAction } from "../redux/authSlice";
import { baseUrl } from "../config";
import { Link } from "react-router-dom";

function Login() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    console.log(loading, error)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const loginData = formData

        try {
            const response = await axios.post(`${baseUrl}/api/login`, loginData);
            if (response.data) {
                console.log("success", response.data)
                dispatch(loginAction(response.data))
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            if (error.response) {
                setError(error.response.data.message)
                console.error('Login failed with status code:', error.response.status);
                console.error('Error data:', error.response.data);
            } else if (error.request) {
                // The request was made, but no response was received.
                setError(error.request.message)
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an error.
                setError(error.message)
                console.error('Request error:', error.message);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                </div>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Do not have an account?{" "}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500">{error}</p>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? "Loading..." : "Log In"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
