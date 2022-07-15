import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthValidator } from "../tools/AuthTools";

const Sprint = () => {
  useEffect(() => {
    AuthValidator.checkAuth();
  }, [])

  const { sprint } = useParams();

  return (
    <div>
      {sprint}
    </div>
  )
}

export default Sprint;
