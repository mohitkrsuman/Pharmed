const Loader = () => {
  return <div>Loading...</div>;
};

export default Loader;

export const SkeletonLoader = ({width = "unset"} : {width: string}) => {
  return (
    <div className="skeleton-loader">
      <div className="skeleton-shape" style={{width}}></div>
      <div className="skeleton-shape"></div>
      <div className="skeleton-shape"></div>
    </div>
  );
};
