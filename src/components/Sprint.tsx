import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { checkAuth } from "../tools/AuthTools";
import { DynamoConnector } from "../serviceProviders/dbProvider";

const Sprint = () => {
  useEffect(() => {
    checkAuth();
    console.log(DynamoConnector.getSprints());
  }, [])

  const { sprint } = useParams();

  return (
    <div>
      {sprint}
    </div>
  )
}

export default Sprint;
