import React from "react";

interface DateRangeProps {
  startDate?: string;
  endDate?: string;
}

export default class DateRange extends React.Component<DateRangeProps, {}> {

  constructor(props: DateRangeProps) {
    super(props);
    this.state = { startDate: undefined, endDate: undefined};
  }
  render() {
    return <div className="flex flex-col w-full md:flex-row">
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-2">{this.props.startDate}</div> 
                <div className="divider lg:divider-horizontal"></div> 
                <div className="grid flex-grow card bg-base-300 rounded-box place-items-center p-2">{this.props.endDate}</div>
              </div>
  }
}