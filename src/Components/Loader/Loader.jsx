import { ThreeDots } from "react-loader-spinner";
import "./LoaderStyle.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="var(--clr-primary)"
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};
export { Loader };
