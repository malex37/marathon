import { Fragment } from "react";

export type AvatarProps = {
    firstName?: string;
    lastName?: string;
    username: string;
}

const getInitials = ({ firstName, lastName, username }: AvatarProps) => {
  if (firstName && lastName) {
    const firstNameInitial = firstName.substring(0, 1);
    const lastNameInitial = lastName.substring(0, 1);

    return `${firstNameInitial}${lastNameInitial}`;
  } else {
    return username.substring(0, 1);
  }
}

const Avatar = (props: AvatarProps) => (
  <Fragment>
    <div className="avatar placeholder p-4">
      <div className="bg-neutral-focus text-neutral-content rounded-full w-16 mask mask-hexagon">
        <span className="text-xl">
          {getInitials(props)}
        </span>
      </div>
    </div> 
    <div>
    <span className="text-sm pr-4">
        {props.username}
      </span>
    </div>
  </Fragment>
);

export default Avatar;