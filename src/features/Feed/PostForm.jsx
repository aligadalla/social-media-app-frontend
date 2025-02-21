import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query"; // Import QueryClient
import { addPost } from "./apiFeed";
import { FaTimes } from "react-icons/fa";

export default function PostForm({ onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  
  const queryClient = useQueryClient(); // Get queryClient to manage cache

  async function onSubmit(data) {
    try {
      await addPost({ description: data.description });
      queryClient.invalidateQueries(["feed"]); // Force refresh posts
      reset(); // Clear form
      onClose(); // Close modal
    } catch (error) {
      console.error("Failed to add post:", error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <FaTimes size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Create a Post</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <textarea
            {...register("description", { required: "Post content is required" })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            placeholder="What's on your mind?"
          ></textarea>

          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
