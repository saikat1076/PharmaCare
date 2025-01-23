import { useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";

const UpdateProfile = () => {
    const { user, setUser, updateUserProfile } = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const photo = form.get("photo");

        updateUserProfile({ displayName: name, photoURL: photo })
            .then(() => {
                setUser((prevUser) => ({
                    ...prevUser,
                    displayName: name,
                    photoURL: photo,
                }));
                toast.success("Profile updated successfully!", {
                    position: "top-center",
                });
            })
            .catch((error) => {
                toast.warning(`Error updating profile: ${error.message}`, {
                    position: "top-center",
                });
            });
    };

    if (!user) {
        // Handle the case where the user is logged out
        return (
            <div>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>PharmaCare | UpdateProfile</title>
                    <link rel="canonical" href="http://mysite.com/example" />
                </Helmet>
                <div className="w-full">
                    <div className="min-h-screen flex justify-center items-center">
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <div className="card-body">
                                <h2 className="text-2xl font-bold text-center">Please log in to update your profile</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>PharmaCare | UpdateProfile</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <div style={{
                // backgroundImage: url(`${bgImg}`),
                backgroundSize: "cover",
                backgroundPosition: "center",
            }} className="w-full">
                <div className="min-h-screen flex justify-center items-center">
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div>
                                <h2 className="text-2xl font-bold text-center">You Can Update Your Profile Here</h2>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder={user.displayName || "Enter your name"}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo</span>
                                </label>
                                <input
                                    name="photo"
                                    type="text"
                                    placeholder={user.photoURL || "Enter your photo URL"}
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Update Profile
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UpdateProfile;
