import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const load = () => axiosSecure.get('/users').then((res) => setUsers(res.data));
  useEffect(load, []);

  const handleRoleChange = async (id, role) => {
    await axiosSecure.patch(`/users/role/${id}`, { role });
    toast.success('Role updated');
    load();
  };

  const handleRemove = async (id) => {
    if (!confirm('Remove this user?')) return;
    await axiosSecure.delete(`/users/${id}`);
    toast.success('User removed');
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Credits</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4 flex items-center gap-3">
                  <img src={u.photo || 'https://i.ibb.co/2n1s5m4/avatar.png'} className="w-8 h-8 rounded-full object-cover" alt="" />
                  {u.name}
                </td>
                <td className="p-4">{u.email}</td>
                <td className="p-4 text-secondary font-semibold">{u.credits}</td>
                <td className="p-4">
                  <select
                    defaultValue={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="px-3 py-1 rounded-lg bg-white/5 border border-white/10"
                  >
                    <option value="supporter">Supporter</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button onClick={() => handleRemove(u._id)} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs cursor-hover">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
