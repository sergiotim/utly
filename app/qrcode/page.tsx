"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useState } from "react";

export default function QrCodeGenerator() {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div className="size-full flex items-center justify-center flex-col px-4">
      <h1 className="text-4xl font-bold mb-8">Create QR Codes Instantly</h1>

      <Input
        className="flex  max-w-sm items-center gap-2"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Text or Link"
      ></Input>

      <QRCodeCanvas
        className="mt-6"
        value={inputValue}
        size={150}
      ></QRCodeCanvas>
    </div>
  );
}
