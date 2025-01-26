import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosPublic from "../Hooks/UseAxiosPublic";
import useCart from "../Hooks/useCart";




const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPerUnitPrice = cart.reduce((total, item) => total + item.perUnitPrice, 0);
    const axiosPublic = useAxiosPublic();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div>
            <div className="flex justify-evenly mb-8 lg:pt-16">
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total perUnitPrice: {totalPerUnitPrice}</h2>
                {cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-primary">Pay</button>
                </Link>:
                <button disabled className="btn btn-primary">Pay</button>
                }

            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>image</th>
                            <th>Name</th>
                            <th>perUnitPrice</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.itemName}
                                </td>
                                <td>${item.perUnitPrice}</td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;