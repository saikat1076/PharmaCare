import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer } from 'react-toastify';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Provider/AuthProvider';
import { Helmet } from 'react-helmet';
import axios from 'axios';

const Register = () => {
  const { CreateNewUser, setUser, updateUserProfile, handleGoogleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Password validation function
  const validatePassword = (password) => {
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const minLength = 6;

    if (!upperCaseRegex.test(password)) {
      return "Password must have at least one uppercase letter.";
    }
    if (!lowerCaseRegex.test(password)) {
      return "Password must have at least one lowercase letter.";
    }
    if (password.length < minLength) {
      return "Password must be at least 6 characters long.";
    }

    return null;
  };

  // Handle manual registration
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");
    const role = form.get("role");

    const passwordError = validatePassword(password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    CreateNewUser(email, password)
      .then((result) => {
        const user = result.user;

        // Update user profile
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            const userData = {
              name,
              email,
              photoURL: photo,
              role,
            };

            // Send data to backend using Axios
            axios.post('http://localhost:5000/users', userData)
              .then(() => {
                setUser({ ...user, displayName: name, photoURL: photo, role });
                toast.success("Registration successful!");
                navigate('/');
              })
              .catch((error) => {
                toast.error(`Error saving user data: ${error.response?.data?.error || error.message}`);
              });
          })
          .catch((error) => {
            toast.error(`Error updating profile: ${error.message}`);
          });
      })
      .catch((error) => {
        toast.error(`Error creating user: ${error.message}`);
      });
  };

  // Handle Google Login
  const handleGoogleLoginClick = () => {
    handleGoogleLogin()
      .then((res) => {
        const user = res.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user',
        };

        // Send data to backend using Axios
        axios.post('http://localhost:5000/users', userData)
          .then(() => {
            setUser(user);
            toast.success("Logged in successfully with Google!");
            navigate('/');
          })
          .catch((error) => {
            toast.error(`Error saving user data: ${error.response?.data?.error || error.message}`);
          });
      })
      .catch((error) => {
        toast.error(`Error with Google login: ${error.message}`);
      });
  };

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>PharmaCare | Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="min-h-screen flex justify-center items-center">
        <ToastContainer position="top-center" />
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input name="name" type="text" placeholder="Name" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input name="email" type="email" placeholder="Email" className="input input-bordered" required />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Role</span>
              </label>
              <select name="role" className="select select-bordered" defaultValue="user">
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Register</button>
            </div>
            <div className="divider">OR</div>
            <button onClick={handleGoogleLoginClick} className="btn bg-black text-white text-xl flex items-center gap-2">
              <FcGoogle /> Google Login
            </button>
          </form>
          <p className="text-center font-bold mb-5">
            Already have an account? <Link to="/auth/login" className="text-blue-500">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
