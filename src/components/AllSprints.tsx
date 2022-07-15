import { useEffect, useState, Fragment } from "react";
import { AuthValidator } from "../tools/AuthTools";
import DbProvider from "../serviceProviders/dbProvider";
import { SprintModel } from "../models/SprintModel";

const AllSprints = () => {
  const [state, setState] = useState<SprintModel[] | undefined>();
  useEffect(() => {
    AuthValidator.checkAuth();

    async function fetchSprints() {
      return await DbProvider.getSprints();
    }

    fetchSprints().then(data => {
      setState(data);
    });
 }, [])

  return (
    <div>
      List of all sprints
      {state?.map((sprint, index) => {
        return (
          <Fragment key={index}>
            <div>Sprint Name: {sprint.name}</div>
            <div>team name: {sprint.team}</div>
          </Fragment>
        )
      })}
    </div>
  )
}

export default AllSprints;
