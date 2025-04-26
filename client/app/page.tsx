import { FileUploadComponent } from "@/components/file-upload";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="min-h-screen w-screen flex">
        <div className="w-[30vw] min-h-screen flex justify-center items-center flex-col">
          <FileUploadComponent />
        </div>
        <div className="w-[70vw] min-h-screen border-l-2">column 2</div>
      </div>
    </div>
  );
}
