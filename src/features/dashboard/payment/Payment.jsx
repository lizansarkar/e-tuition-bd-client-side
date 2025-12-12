import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSicure from "../../../hooks/useAxiosSicure";

const Payment = () => {
  const { paymentId } = useParams();
  const axiosSecure = useAxiosSicure();

  const { isLoading, data: tutor } = useQuery({
    queryKey: ["tutor", paymentId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/${paymentId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      tuitionBudget: tutor.tuitionBudget,
      tuitionId: tutor._id,
      tutorEmail: tutor.senderEmail,
      tutorName: tutor.name,
  };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

    console.log(res.data);

    window.location.href = res.data.url;
  };

  if (isLoading) {
    return (
      <div>
        <span className="loading loading-infinity loading-xl"></span>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Please Pay ${tutor.tuitionBudget} for : {tutor.tutorName}{" "}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-black">
        Pay
      </button>
    </div>
  );
};

export default Payment;
