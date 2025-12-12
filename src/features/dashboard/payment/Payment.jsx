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
      const res = await axiosSecure.get(`/applications/${paymentId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      expectedSalary: tutor.expectedSalary,
      tuitionId: tutor.tuitionId,
      tutorEmail: tutor.tutorEmail,
      tutorName: tutor.tutorName,
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
        Please Pay ${tutor.expectedSalary} for : {tutor.tutorName}
      </h2>
      <button onClick={handlePayment} className="btn btn-primary text-white">
        Confirm Pay
      </button>
    </div>
  );
};

export default Payment;
