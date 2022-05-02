const DemoBlock = ({ label, children }) => (
  <>
    <div className="title">{label}:</div>
    {children}
  </>
);

export default DemoBlock;
