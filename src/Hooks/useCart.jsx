// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./UseAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";


const useCart = () => {
   const axiosPublic = useAxiosPublic();
   const {user} = useContext(AuthContext)
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['cart', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/carts/email?email=${user.email}`);
            return res.data;
        }
    })

    return [cart, refetch]
};

export default useCart;