interface DateRangeProps {
  startDate?: string;
  endDate?: string;
}

const DateRange = (props: DateRangeProps) => {
  return (
    <div className="flex flex-col w-full md:flex-row">
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-2">{props.startDate}</div>
      <div className="divider lg:divider-horizontal"></div>
      <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-2">{props.endDate}</div>
    </div>
  );
};

export default DateRange;
