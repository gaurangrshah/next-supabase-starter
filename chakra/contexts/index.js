import * as ErrorContext from "./error-context";
import * as ToastContext from "./toast-context";
import * as ModalContext from "./modal-context";

export const Contexts = {
  errors: ErrorContext,
  toasts: ToastContext,
  modal: ModalContext,
};

export const Providers = {
  errors: ErrorContext.ErrorProvider,
  toasts: ToastContext.ToastProvider,
  modal: ModalContext.ModalProvider,
};
