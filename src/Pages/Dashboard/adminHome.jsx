import { useQuery } from '@tanstack/react-query';
import { FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import useAxiosPublic from '../../Hooks/UseAxiosPublic';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';
import AOS from 'aos';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Colors
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

  useEffect(() => {
    AOS.init(); // Initialize AOS for animations
  }, []);

  // Chart Data
  const chartData = [
    { name: "Revenue", value: stats.revenue || 0 },
    { name: "Users", value: stats.users || 0 },
    { name: "Orders", value: stats.orders || 0 },
    { name: "Menu Items", value: stats.cartItems || 0 }
  ];

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

      {/* Stats Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {/* Revenue Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-figure text-secondary">
            <FaDollarSign className="text-4xl text-green-500" />
          </div>
          <div className="stat-title text-xl">Revenue</div>
          <div className="stat-value text-2xl text-blue-600">${stats.revenue}</div>
        </motion.div>

        {/* Users Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-figure text-secondary">
            <FaUsers className="text-4xl text-blue-500" />
          </div>
          <div className="stat-title text-xl">Users</div>
          <div className="stat-value text-2xl text-purple-600">{stats.users}</div>
        </motion.div>

        {/* Menu Items Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-figure text-secondary">
            <FaBook className="text-4xl text-orange-500" />
          </div>
          <div className="stat-title text-xl">Menu Items</div>
          <div className="stat-value text-2xl text-teal-600">{stats.cartItems}</div>
        </motion.div>

        {/* Orders Card */}
        <motion.div
          className="stat bg-white shadow-xl rounded-lg p-6"
          data-aos="fade-up"
          whileHover={{ scale: 1.05 }}
        >
          <div className="stat-title text-xl">Orders</div>
          <div className="stat-value text-2xl text-red-600">{stats.orders}</div>
        </motion.div>
      </div>

      {/* Graph Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4">Overall Statistics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" stroke="#333" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-center mb-4">Data Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#82ca9d">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
