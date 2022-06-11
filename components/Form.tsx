import { useForm, SubmitHandler } from "react-hook-form";
import { Post } from "../typings";
import { useState } from "react";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  posts: Post;
}

const Form = ({ posts }: Props) => {
  const [submitted, isSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        isSubmitted(true);
      })
      .catch(err => {
        console.log(err);
        isSubmitted(false);
      });
  };
  return (
    <>
      {submitted ? (
        <div className='flex flex-col p-10 bg-yellow-500 text-white max-w-2xl mx-auto'>
          <h3 className='text-3xl font-bold'>
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10'
        >
          <h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
          <h4 className='text-3xl font-bold'>Leave a comment below!</h4>
          <hr className='py-3 mt-2' />

          <input
            {...register("_id")}
            type='hidden'
            name='_id'
            value={posts._id}
          />

          <label className='block mb-5'>
            <span className='text-gray-700'>Name</span>
            <input
              className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
              placeholder='John Doe'
              type='text'
              {...register("name", { required: true })}
            />
          </label>
          <label className='block mb-5'>
            <span className='text-gray-700'>Email</span>
            <input
              className='shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring'
              placeholder='johndoe@email.com'
              type='email'
              {...register("email", { required: true })}
            />
          </label>
          <label className='block mb-5'>
            <span className='text-gray-700'>Comment</span>
            <textarea
              className='shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring'
              placeholder='Enter Comment'
              rows={8}
              {...register("comment", { required: true })}
            />
          </label>
          <div className='flex flex-col p-5'>
            {errors.name && (
              <span className='text-red-500'>The Name Field is required</span>
            )}
            {errors.comment && (
              <span className='text-red-500'>
                The Comment Field is required
              </span>
            )}
            {errors.email && (
              <span className='text-red-500'>The Email Field is required</span>
            )}
          </div>
          <input
            type='submit'
            className='shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer'
          />
        </form>
      )}
      {/* Comments render */}
      <div className='flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2'>
        <h3 className='text-4xl'>Comments</h3>
        <hr className='pb-2' />
        {posts.comments.map(comment => (
          <div key={comment._id}>
            <p>
              <span className='text-yellow-500'>{comment.name}</span>:{" "}
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};
export default Form;
