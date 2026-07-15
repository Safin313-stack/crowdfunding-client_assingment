import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Withdrawals = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [campaigns, setCampaigns] = useState([]);
  const [creditsToWithdraw, setCreditsToWithdraw] = useState('');
  const [paymentSystem, setPaymentSystem] = useState('Stripe');
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    axiosSecure.get(`/campaigns/creator/${user.email}`).then((res) => setCampaigns(res.data));
  }, [user.email]);

  const totalRaised = campaigns.reduce((sum, c) => sum + (c.amount_raised || 0), 0);
  const withdrawAmount = creditsToWithdraw ? (Number(creditsToWithdraw) / 20).toFixed(2) : '0.00';
  const canWithdraw = totalRaised >= 200;

  const handleWithdraw = async (e) => {
    e.preventDefault();
    const credits = Number(creditsToWithdraw);
    if (credits > totalRaised) return toast.error('Cannot exceed total raised credits.');

    try {
      await axiosSecure.post('/withdrawals', {
        creator_email: user.email,
        creator_name: user.displayName,
        withdrawal_credit: credits,
        withdrawal_amount: Number(withdrawAmount),
        payment_system: paymentSystem,
        account_number: accountNumber,
      });
      toast.success('Withdrawal request submitted.');
      setCreditsToWithdraw('');
      setAccountNumber('');
    } catch {
      toast.error('Failed to submit withdrawal.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Withdrawals</h1>
      <div className="glass rounded-2xl p-6 max-w-md mb-8">
        <p className="text-gray-400 text-sm">Total Raised</p>
        <p className="text-3xl font-bold text-secondary">{totalRaised} credits</p>
        <p className="text-gray-400 text-sm mt-2">≈ ${(totalRaised / 20).toFixed(2)} withdrawable</p>
      </div>

      {!canWithdraw ? (
        <p className="text-gray-500">Minimum 200 credits (equal to $10) required to request a withdrawal.</p>
      ) : (
        <form onSubmit={handleWithdraw} className="glass rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
          <input
            type="number" placeholder="Credits To Withdraw" required max={totalRaised}
            value={creditsToWithdraw} onChange={(e) => setCreditsToWithdraw(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
          <input
            type="text" value={`$${withdrawAmount}`} readOnly
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400"
          />
          <select value={paymentSystem} onChange={(e) => setPaymentSystem(e.target.value)} className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none">
            <option>Stripe</option>
            <option>Bkash</option>
            <option>Rocket</option>
            <option>Nagad</option>
          </select>
          <input
            placeholder="Account Number" required value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-primary outline-none"
          />
          {Number(creditsToWithdraw) > totalRaised ? (
            <p className="text-red-400 md:col-span-2 text-sm">Insufficient credit</p>
          ) : (
            <button className="btn-primary md:col-span-2 py-3 rounded-xl font-semibold">Withdraw</button>
          )}
        </form>
      )}
    </div>
  );
};

export default Withdrawals;
