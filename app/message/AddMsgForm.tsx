import { useForm } from "react-hook-form";
// Components
import Input from "@/components/Input";


export default function AddMsgForm({}) {
  const { register } = useForm();

  return (
    <form className="bg-white p-10 w-full max-w-xl rounded-md">
      <Input label="User" name="user" register={register} />
      <textarea
        className="w-full resize-none border-2 mb-2 p-3 text-sm outline-none border-med-gray rounded-md"
        rows={5}
        placeholder="Send a message..."
      ></textarea>
      <button className="form-btn">Create Message</button>
    </form>
  );
}
