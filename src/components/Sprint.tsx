import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkAuth } from "../tools/AuthTools";

const Sprint = () => {
  useEffect(() => {
    checkAuth();
  }, [])

  const { sprint } = useParams();

  return (
    <div>
      {sprint}
    </div>
  )
}

export default Sprint;
