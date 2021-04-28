import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import Alert from "@/chakra/components/alert";

export const useAlert = () => {
  const [show, setShow] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  function resetAlert() {
    setShow(false);
    setConfirmed(false);
    setLoading(false);
  }

  const handleConfirmDelete = async (e) => {
    console.log("flippling alert", e);
    e.preventDefault();
    e.stopPropagation();
    setShow(true);
  };

  const ChAlert = ({ header, body, btnLabel, action, handler }) => {
    const confirmHandler = async (e) => {
      e.preventDefault();
      setConfirmed(true);
      setLoading(true);
      const res = await action(handler?.data && handler.data);
      resetAlert();
      return res;
    };

    return (
      <>
        {loading && <Spinner />}
        {!confirmed && (
          <Alert
            open={show}
            header={header}
            handleSubmit={{
              action: confirmHandler,
              btnLabel,
              cancel: resetAlert,
            }}
            children={body}
          />
        )}
      </>
    );
  };

  return {
    Alert: ChAlert,
    handleConfirmDelete,
  };
};
