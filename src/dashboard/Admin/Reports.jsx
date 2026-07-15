import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Reports = () => {
  const axiosSecure = useAxiosSecure();
  const [reports, setReports] = useState([]);

  const load = () => axiosSecure.get('/admin/reports').then((res) => setReports(res.data));
  useEffect(load, []);

  const handleAction = async (id, action) => {
    await axiosSecure.patch(`/admin/reports/${id}/resolve`, { action });
    toast.success(`Report ${action}d`);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Reports</h1>
      <div className="glass rounded-2xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-white/10">
              <th className="p-4">Reporter</th>
              <th className="p-4">Campaign</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Date</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id} className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="p-4">{r.reporter_name}</td>
                <td className="p-4">{r.campaign_title}</td>
                <td className="p-4">{r.reason}</td>
                <td className="p-4">{new Date(r.date).toLocaleDateString()}</td>
                <td className="p-4 flex gap-2">
                  {r.status === 'open' ? (
                    <>
                      <button onClick={() => handleAction(r._id, 'suspend')} className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-xs cursor-hover">Suspend</button>
                      <button onClick={() => handleAction(r._id, 'delete')} className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs cursor-hover">Delete Campaign</button>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500">resolved</span>
                  )}
                </td>
              </tr>
            ))}
            {reports.length === 0 && (
              <tr><td colSpan={5} className="p-6 text-center text-gray-500">No reports.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
