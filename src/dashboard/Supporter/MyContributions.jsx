import { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const LIMIT = 6;
const statusColor = { pending: 'bg-yellow-500/20 text-yellow-400', approved: 'bg-secondary/20 text-secondary', rejected: 'bg-red-500/20 text-red-400' };

const MyContributions = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [data, setData] = useState({ list: [], total: 0 });
  const [page, setPage] = useState(0);

  useEffect(() => {
    axiosSecure.get(`/contributions/supporter/${user.email}?page=${page}&limit=${LIMIT}`).then((res) => setData(res.data));
  }, [user.email, page]);

  const totalPages = Math.ceil(data.total / LIMIT);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Contributions</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Campaign</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.list.map((c) => (
              <tr key={c._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{c.campaign_title}</td>
                <td className="p-4 text-secondary font-semibold">{c.Contribution_amount}</td>
                <td className="p-4">{new Date(c.current_date).toLocaleDateString()}</td>
                <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs ${statusColor[c.status]}`}>{c.status}</span></td>
              </tr>
            ))}
            {data.list.length === 0 && (
              <tr><td colSpan={4} className="p-6 text-center text-gray-500">No contributions yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-9 h-9 rounded-full text-sm cursor-hover transition ${page === i ? 'btn-primary' : 'glass hover:border-secondary'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyContributions;
