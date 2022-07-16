
interface TeamMemberComponentProp {
  name: string;
  profilePicture?: string; // base 64 encoded image?
}

const TeamMember = (prop: TeamMemberComponentProp) => {
  let component = (
    <div className="flex flex-row">
      <div className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
          <span className="text-1xl">{prop.name.substring(0, 1)}</span>
        </div>
      </div>
      <div className="pl-3">{prop.name}</div>
    </div>
  );
  if (prop.profilePicture) {
    component = (
      <div className="flex flex-row">
        <div className="avatar online">
          <div className="w-24 rounded-full">
            <img src={`data:image/png;base64, ` + prop.profilePicture} />
          </div>
        </div>
        <div>
          {prop.name}
        </div>
      </div>
    );
  }
  return component;
}

export default TeamMember;