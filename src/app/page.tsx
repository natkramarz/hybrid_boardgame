import DrawNumber from "@/components/DrawNumber";
import Battle from "@/components/Battle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-800 p-4">
    <div className="grid grid-cols-2 gap-4">
    <div><DrawNumber/></div>
    <div><Battle/></div>
    </div>
    </div>
  );
}
