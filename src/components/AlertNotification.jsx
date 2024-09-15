import React from "react";
import "./Alert.css"

function AlertNotification({message, enviarDados}) {
  
  return (
   
    <div class="popup-container">

        <div class="popup alert-popup">
          <div class="popup-icon alert-icon">
            <svg
              class="alert-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <div class="alert-message">{message}</div>
          <div class="popup-icon close-icon" onClick={() => {enviarDados(false)}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              class="close-svg"
            >
              <path
                d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                class="close-path"
              ></path>
            </svg>
          </div>
        </div>
  
      </div>

    
  );
}

export default AlertNotification;
