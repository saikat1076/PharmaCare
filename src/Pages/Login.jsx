import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';

const Login = () => {
    // Access AuthContext values
    const { userLogin, setUser, handleGoogleLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        try {
            const result = await userLogin(email, password);
            const user = result.user;
            setUser(user);
            toast.success("Login Successful!", { position: "top-center" });
            navigate(location?.state?.from || "/");
        } catch (error) {
            toast.warning("Incorrect information. Please try again.", { position: "top-center" });
        }
    };

    // Handle Google login
    const handleGoogle = async () => {
        try {
            await handleGoogleLogin();
            navigate(location?.state?.from || "/");
        } catch (error) {
            toast.error("Google login failed. Please try again.", { position: "top-center" });
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <h2 className="text-2xl font-semibold text-center">Login to your account</h2>
                <form onSubmit={handleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            name='password'
                            type={showPassword ? "text" : "password"}
                            placeholder="password"
                            className="input input-bordered"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-12 text-xl"
                        >
                            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                        </button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>
                    <div className="divider">OR</div>
                    <button
                        type="button"
                        onClick={handleGoogle}
                        className='btn bg-black text-white text-xl flex items-center gap-2'
                    >
                        <FcGoogle /> Google Login
                    </button>
                </form>
                <p className='text-center font-semibold mb-5'>
                    Don't have an account? <Link to='/auth/register' className='text-blue-500'>Register</Link>
                </p>
            </div>
            <ToastContainer position="top-center" autoClose={5000} />
        </div>
    );
};

export default Login;