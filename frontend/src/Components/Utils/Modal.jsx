import ReactDOM from "react-dom";
import CrossIcon from "../../assets/cross.png";

const Modal = ({ children, modal, handleClose, closable }) => {
  if (!modal) {
    return <div></div>;
  }

  return ReactDOM.createPortal(
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"></div>
      <div className="rounded-lg fixed text-white bg-templateBlue top-0 left-0 right-0 bottom-0 m-auto h-fit inline-block xl:w-[45%] lg:w-[50%] md:w-[60%] sm:w-[80%] w-[90%] lg:p-3 sm:p-2 p-1 bg-white">
        {closable && (
          <button onClick={handleClose} className="absolute right-0 top-0 m-2">
            <img className="w-6 h-6" src={CrossIcon} />
          </button>
        )}
        <div className="m-5">{children}</div>
      </div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
