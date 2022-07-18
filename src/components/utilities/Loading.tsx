const Loading = () => {
  return(
    <div className="flex flex-col items-center pt-10">
      <svg className='animate-spin h-28 w-28' viewBox='0 0 24 24'>
        <path className="opacity-75" fill="bg-slate" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>
  );
};

export default Loading;