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
  <div className="avatar placeholder p-4">
    <div className="bg-neutral-focus text-neutral-content rounded-full w-16">
      <span className="text-xl">
        {getInitials(props)}
      </span>
    </div>
  </div> 
);

export default Avatar;