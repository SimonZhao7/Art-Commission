import { useState } from "react";

export const useModal = (initialValue: boolean) => {
  const [modalOpen, setModalOpen] = useState(initialValue);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return {modalOpen, openModal, closeModal};
};

