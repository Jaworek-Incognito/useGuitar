import { useNavigate, useSearchParams } from "react-router-dom";
import Spinner from "../../ui/Spinner";
import { verifyEmailApi } from "../../services/apiAuth";
import { useEffect } from "react";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function sendData() {
      const email = searchParams.get("email");
      const verificationToken = searchParams.get("verificationToken");
      const response = await verifyEmailApi({ email, verificationToken });
      toast.loading("Loading...");
      if (response) {
        toast.dismiss();
        toast.success(response);
        navigate("/");
      }
    }
    sendData();
  }, [searchParams, navigate]);

  return <Spinner />;
}

export default VerifyEmail;
