import React from "react";
import loadingImage from "../../assets/images/loadingimage.svg";
import Modal from "../../_shared/components/Modal/Modal";

const LoadingModal = ({ showModal }) => {
  return (
    <Modal showModal={showModal}>
      <img src={loadingImage} alt="loading..."></img>
    </Modal>
  );
};

export default LoadingModal;
