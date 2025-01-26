import { useQuery } from '@tanstack/react-query';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { useEffect } from 'react';

// Colors for cards
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const AdminHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosPublic();

  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin-stats');
      return res.data;
    }
  });

  const { data: chartData = [] } = useQuery({
    queryKey: ['order-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/order-stats');
      return res.data;
    }
  });

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
  }, []);

  return (
    <div className="container mx-auto pt-10">
      <motion.h2
        className="text-3xl text-center font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <span>Hi, Welcome </span>
        {user?.displayName ? user.displayName : 'Back'}
      </motion.h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

        {/* Revenue Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          data-aos-delay="100"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-4xl text-green-500" />
          </div>
          <div className="stat-title text-xl">Revenue</div>
          <div className="stat-value text-2xl text-blue-600">${stats.revenue}</div>
          <div className="stat-desc text-sm text-gray-500">Jan 1st - Feb 1st</div>
        </motion.div>

        {/* Users Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          data-aos-delay="200"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-figure text-secondary">
            <FaUsers className="text-4xl text-blue-500" />
          </div>
          <div className="stat-title text-xl">Users</div>
          <div className="stat-value text-2xl text-purple-600">{stats.users}</div>
          <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
        </motion.div>

        {/* Menu Items Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          data-aos-delay="300"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-figure text-secondary">
            <FaBook className="text-4xl text-orange-500" />
          </div>
          <div className="stat-title text-xl">Menu Items</div>
          <div className="stat-value text-2xl text-teal-600">{stats.cartItems}</div>
          <div className="stat-desc text-sm text-gray-500">↗︎ 400 (22%)</div>
        </motion.div>

        {/* Orders Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          data-aos-delay="400"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-xl">Orders</div>
          <div className="stat-value text-2xl text-red-600">{stats.orders}</div>
          <div className="stat-desc text-sm text-gray-500">↘︎ 90 (14%)</div>
        </motion.div>

      </div>

      {/* Optional: Add Chart or other Components Here */}

    </div>
  );
};

export default AdminHome;
