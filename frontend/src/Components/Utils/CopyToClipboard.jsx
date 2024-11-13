import React, { useState } from "react";
import ClipBoardIcon from "../../assets/clipboard.png";
import { TextInput } from "flowbite-react";

export default function CopyToClipboard({ textToCopy = "Copy default" }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.mesage);
      }
    );
  };

  const btnStyle = copied ? "bg-green-500 text-white" : "";

  return (
    <div className="text-center my-5 text-black">
      <div className="flex justify-between items-center gap-4">
        <TextInput disabled={true} value={textToCopy} className="flex-grow" />
        <button
          onClick={copyToClipboard}
          className={
            btnStyle +
            " text-sm border w-fit border-gray-500 rounded p-2 transition"
          }
        >
          {copied ? "Copied" : <img className="w-6 h-6" src={ClipBoardIcon} />}
        </button>
      </div>
    </div>
  );
}
