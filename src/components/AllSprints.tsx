import { useEffect } from "react";
import { checkAuth } from "../tools/AuthTools";
// import { DynamoConnector } from "../serviceProviders/dbProvider";

const AllSprints = () => {
  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <div>
      List of all sprints
    </div>
  )
}

export default AllSprints;
