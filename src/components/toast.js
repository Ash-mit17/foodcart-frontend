import { toast } from "react-toastify";
/**
 * ### Use this function for toast success messages
 * #### Provide message as a parameter for toast message
 * - If you want you can give your custom message wherever required
 * - By defalut position of the toast is `bottom-left`
 * we can change it by passing position in third parameter
 * @param message this message is displayed on toast
 * @param props can provide additional props if required to change 
 * default props of`<ToastContainer />` else pass empty object
 * @example 
 *    props = {
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
*     }
* @param position it sets position of the toast, default "bottom-left"
* @example notifySuccess(data.message, {autoclose: 500}) | notifySuccess("registration complete", {}, "top-right")
*/
export const notifySuccess = (
  message,
  props = {},
  position = "bottom-left",
) => {
  toast.success(message, {
    position,
    ...props,
  });
};

/**
 * ### Use this function for toast warning messages
 * #### Provide message as a parameter for toast message
* - If you want you can give your custom message wherever required
 * - By defalut position of the toast is `bottom-left`
 * we can change it by passing position in third parameter
 * @param message this message is displayed on toast
 * @param props can provide additional props if required to change 
 * default props of`<ToastContainer />` else pass empty object
 * @example 
 *    props = {
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
*     }
* @param position it sets position of the toast, default "bottom-left"
* @example notifyWarning(data.message, props={autoclose: 500}) | notifyWarning("invalid input", {}, "top-right")
*/
export const notifyWarning = (
  message,
  props = {},
  position = "bottom-left",
) => {
  toast.warning(message, {
    position,
    ...props,
  });
};

/**
 * ### Use this function for toast error messages
 * #### Provide message as a parameter for toast message
* - If you want you can give your custom message wherever required
 * - By defalut position of the toast is `bottom-left`
 * we can change it by passing position in third parameter
 * @param message this message is displayed on toast
 * @param props can provide additional props if required to change 
 * default props of`<ToastContainer />` else pass empty object
 * @example 
 *    props = {
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
*     }
* @param position it sets position of the toast, default "bottom-left"
* @example notifyError(error.message, props={autoclose: 500}) | notifyError("server error", {}, "top-right")
*/
export const notifyError = (message, props = {}, position = "bottom-left") => {
  toast.error(message, {
    position,
    ...props,
  });
};