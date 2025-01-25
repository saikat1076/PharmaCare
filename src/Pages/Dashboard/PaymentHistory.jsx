import { useContext } from 'react';
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosPublic from "../../Hooks/UseAxiosPublic";

const PaymentHistory = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosPublic();

    if (!user?.email) {
        return <div>Please log in to see your payment history.</div>;
    }

    const { data: payments = [], isLoading, isError, error } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>
            <h2 className="text-3xl">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>perUnitPrice</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>${payment.perUnitPrice}</td>
                                <td>{payment.transactionId}</td>
                                <td>{payment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;
