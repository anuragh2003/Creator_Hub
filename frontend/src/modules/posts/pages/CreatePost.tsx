// TODO (Member 2): Add file upload integration with Multer & Cloudinary
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function CreatePost() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Share Your Work</h1>
      <Card className="p-6 space-y-5">
        <Input label="Title" placeholder="Give your project a title" />
        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
            rows={4}
            placeholder="Tell the community about your creative process..."
          />
        </div>
        <div className="flex flex-col gap-1 text-left">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-violet-500">
            <option value="design">Design</option>
            <option value="illustration">Illustration</option>
            <option value="photography">Photography</option>
            <option value="animation">Animation</option>
            <option value="music">Music</option>
            <option value="writing">Writing</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Button className="w-full">Publish Creative Work</Button>
      </Card>
    </div>
  );
}
