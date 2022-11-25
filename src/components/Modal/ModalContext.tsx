/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import Modal from './Modal';
import {
  CustomizeContext,
  MainContext,
  ModalContextProps,
  OpenContext,
  Position,
  Size,
} from './types';

export const MainCtx = createContext<MainContext | null>(null);
export const CustomizeCtx = createContext<CustomizeContext | null>(null);
export const OpenCtx = createContext<OpenContext | null>(null);

export const ModalCtx = ({
  width,
  height,
  position,
  background = true,
  children,
}: ModalContextProps) => {
  const customize = useRef<CustomizeContext>({
    setSize: null,
    setPosition: null,
  });
  const modalCommand = useRef<MainContext>({
    openModal: null,
    closeModal: null,
  });
  const [mount, setMount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<Size>({ width, height });
  const [modalPosition, setModalPosition] = useState<Position>(position);
  const [content, setContent] = useState<ReactNode>(null);

  const openModal = useCallback(
    (component: ReactNode) => {
      setMount(true);
      setIsOpen(true);
      setContent(component);
    },
    []
  );
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (!isOpen) {
      // Modal close 애니메이션을 위해 delayed unmount
      timerId = setTimeout(() => setMount(false), 350);
    }
    // document.body.style.overflowY = isOpen ? 'hidden' : 'auto';

    return () => clearTimeout(timerId);
  }, [isOpen]);

  customize.current.setSize = setModalSize;
  customize.current.setPosition = setModalPosition;

  modalCommand.current.openModal = openModal;
  modalCommand.current.closeModal = closeModal;

  return (
    <MainCtx.Provider value={modalCommand.current}>
      <CustomizeCtx.Provider value={customize.current}>
        <OpenCtx.Provider value={{ isOpen, setIsOpen }}>
          {mount && (
            <Modal
              width={modalSize.width}
              height={modalSize.height}
              position={modalPosition}
              background={background}
              content={content}
            />
          )}
        </OpenCtx.Provider>
        {children}
      </CustomizeCtx.Provider>
    </MainCtx.Provider>
  );
};
