import { useEffect, useRef } from "react";
import { useModal } from "./useModal";

export const useTrackingModal = <
  ParentRefType extends HTMLElement,
  ModalRefType extends HTMLElement,
>({
  offsetTop = 0,
  offsetLeft = 0,
}) => {
  const { modalOpen, openModal, closeModal } = useModal(false);
  const parent = useRef<ParentRefType>(null);
  const modal = useRef<ModalRefType>(null);

  const checkClickOutside = (e: MouseEvent) => {
    if (modal.current && !modal.current.contains(e.target as Node)) {
      closeModal();
    }
  };

  const updatePosition = () => {
    if (!parent.current) {
      return;
    }

    const { top, left } = parent.current.getBoundingClientRect();
    if (modal.current) {
      modal.current.style.top = `${top + offsetTop}px`;
      modal.current.style.left = `${left + offsetLeft}px`;
    }
  };

  useEffect(() => {
    if (modalOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("click", checkClickOutside);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("click", checkClickOutside);
      };
    }
  }, [modalOpen]);

  return { modalOpen, openModal, closeModal, modal, parent };
};
