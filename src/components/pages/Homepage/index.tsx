import { TextArea, TextInput } from "@/components/molecules";
import { FileUploadModal } from "@/components/organisms";

export default function Homepage() {
  return (
    <main className="w-full flex items-center justify-center h-screen bg-white text-black">
      <div className="flex flex-col p-8 gap-4 items-center justify-center w-[600px] ">
        fasdfasdf
        <TextInput placeholder="Enter Your Name" label="Name" />
        <TextArea placeholder="Enter Your Name" label="Description" />
        <FileUploadModal />
      </div>
    </main>
  );
}
