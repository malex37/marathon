import { useEffect, useState } from "react";
import { checkAuth } from "../tools/AuthTools";
import { DynamoConnector } from "../serviceProviders/dbProvider";
import { SprintModel } from "../models/SprintModel";

const AllSprints = () => {
  const [state, setState] = useState<SprintModel[] | undefined>();
  useEffect(() => {
    checkAuth();

    async function fetchSprints() {
      return await DynamoConnector.getSprints();
    }

    fetchSprints().then(data => {
      console.log('data', data);
      setState(data);
    });
 }, [])

  return (
    <div>
      List of all sprints
      {state?.map(sprint => {
        return (
          <>
            <div>Sprint Name: {sprint.name}</div>
            <div>team name: {sprint.team}</div>
          </>
        )
      })}
    </div>
  )
}

export default AllSprints;
