import { toast } from "sonner";
const toastId = "sonnerToast";

export const ToastLoading = ({ message }: { message: string }) => {
  toast.loading(message, {
    id: toastId,
  });
};
export const ToastSuccess = ({ message }: { message: string }) => {
  toast.success(message, {
    style: {
      background: "#0dd157",
      border: "1px solid #0dd157",
      color: "white",
    },
  });
};
export const ToastError = ({ message }: { message: string }) => {
  toast.error(message, {
    style: {
      background: "#fb4143",
      border: "1px solid #fb4143",
      color: "white",
    },
  });
};
export const ToastDismiss = () => toast.dismiss(toastId);
