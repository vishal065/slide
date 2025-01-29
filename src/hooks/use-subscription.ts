import axios from "axios";
import { useState } from "react";

const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const onSubscribe = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post("/api/payment");

      if (response.data.status === 200) {
        return (window.location.href = `${response.data.session_url}`);
      }
      setIsProcessing(false);
    } catch (error) {
      console.log("error in axios stripe ", error);
    }
  };
  return { onSubscribe, isProcessing };
};

export default useSubscription;
