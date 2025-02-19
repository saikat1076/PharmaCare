import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from "react-helmet";
import { AuthContext } from "../../Provider/AuthProvider";
import { motion } from "framer-motion";
import { FaEdit } from "react-icons/fa";

const ProfilePage = () => {
    const { user, setUser, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);

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
                setIsEditing(false);
            })
            .catch((error) => {
                toast.warning(`Error updating profile: ${error.message}`, {
                    position: "top-center",
                });
            });
    };

    if (!user) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <Helmet>
                    <title>PharmaCare | Profile</title>
                </Helmet>
                <h2 className="text-2xl font-bold text-center text-red-600">
                    Please log in to access your profile
                </h2>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen flex flex-col items-center justify-center"
            style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/wave-gradient-background-luxury-dark-modern-design_343694-3088.jpg?semt=ais_hybrid')`,
                backgroundSize: "cover", // পুরো ব্যাকগ্রাউন্ড কভার করবে
                backgroundPosition: "center", // ব্যাকগ্রাউন্ড সেন্টার থাকবে
                backgroundRepeat: "no-repeat", // ইমেজ রিপিট হবে না
                backgroundAttachment: "fixed", // স্ক্রল করলে ব্যাকগ্রাউন্ড থাকবে
                width: "100%", // পুরো স্ক্রীনের জন্য
                height: "100vh", // পুরো ভিউপোর্ট হাইট কভার করবে
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            
        >
            <Helmet>
                <title>PharmaCare | Profile</title>
            </Helmet>

            {/* Profile Card */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-md text-white text-center border border-white/20"
            >
                <img 
                    src={user.photoURL || "https://via.placeholder.com/150"} 
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg"
                />
                <h2 className="text-2xl font-bold mt-4">{user.displayName || "Your Name"}</h2>
                <p className="text-gray-300">{user.email || "example@email.com"}</p>
                <p className="text-gray-400 mt-2">📍 {user?.address || "Add your address"}</p>

                <button 
                    onClick={() => setIsEditing(true)} 
                    className="mt-4 bg-white/80 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition hover:bg-white/50 text-gray-900 font-semibold"
                >
                    <FaEdit /> Edit Profile
                </button>
            </motion.div>

            {/* Profile Update Modal */}
            {isEditing && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-md">
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm"
                    >
                        <h2 className="text-xl font-bold text-center mb-4">Update Profile</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-semibold">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    defaultValue={user.displayName}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Photo URL</label>
                                <input
                                    name="photo"
                                    type="text"
                                    defaultValue={user.photoURL}
                                    className="w-full p-2 border rounded-lg"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button 
                                    type="button" 
                                    onClick={() => setIsEditing(false)} 
                                    className="bg-gray-400 px-4 py-2 rounded-lg text-white"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 px-4 py-2 rounded-lg text-white"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default ProfilePage;
