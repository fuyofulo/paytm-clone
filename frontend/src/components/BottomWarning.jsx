import { Link } from "react-router-dom"

const BottomWarning = ({ content, content2, to }) => {
  return (
    <div className="py-2 text-sm flex justify-center">
      <div>{content}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {content2}
      </Link>
    </div>
  );
};

export default BottomWarning;
