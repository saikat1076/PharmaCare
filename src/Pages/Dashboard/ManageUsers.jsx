import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'; // Import SweetAlert2

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users
    axios.get('http://localhost:5000/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users.');
        setLoading(false);
      });
  }, []);

 
  const handleRoleChange = (userId, newRole) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You are about to make this user a ${newRole}. This action is irreversible.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, change it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the role change
        axios.put(`http://localhost:5000/users/${userId}`, { role: newRole })
          .then((response) => {
            toast.success(`User role updated to ${newRole}`);
            setUsers(users.map((user) =>
              user._id === userId ? { ...user, role: newRole } : user
            ));
          })
          .catch((error) => {
            console.error('Error updating role:', error);
            toast.error('Error updating user role.');
          });
      } else {
        // If canceled, do nothing or show a cancellation message
        toast.info('Role change canceled.');
      }
    });
  };

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="container">
      <h2 className="text-2xl mb-4">Manage Users</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-bordered"
                  >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border border-gray-300 p-2 text-center">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
