
const Wrapper = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className="max-w-480 mx-auto min-h-dvh">
      {children}
    </div>
  );
};

export default Wrapper;
