import { Form, Link, redirect, useLoaderData } from 'react-router-dom';
import { deleteBlog, getBlogById } from '../services/blogService';

export async function loader({ params }) {
  const blog = await getBlogById(params.blogId);
  return { blog };
}

export async function action({ params }) {
  await deleteBlog(params.blogId);
  return redirect(`/`);
}

export default function Blog() {
  const { blog } = useLoaderData();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const blogPost = {
    avatar: 'https://placekitten.com/g/200/200',
    favorite: true,
    ...blog,
  };

  return (
    <div id="blog">
      <div>
        <img key={blogPost.avatar} src={blogPost.avatar || null} alt="Story" />
      </div>

      <div>
        <h1>
          {blogPost.title} <Favorite blog={blogPost} />
        </h1>

        <p>{blogPost.description}</p>

        {blogPost.author && (
          <p>
            <Link to={`/users/${blogPost.author}`}>@{blogPost.author}</Link>
          </p>
        )}

        {blogPost.createdAt && <p>{blogPost.createdAt}</p>}

        {currentUser === blogPost.author ? (
          <div>
            <Form action="edit">
              <button type="submit">Edit</button>
            </Form>
            <Form
              method="post"
              onSubmit={(event) => {
                // eslint-disable-next-line no-restricted-globals
                if (
                  !confirm('Please confirm you want to delete this record.')
                ) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit">Delete</button>
            </Form>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Favorite({ blog }) {
  // yes, this is a `let` for later
  const { favorite } = blog;
  return (
    <Form method="post">
      <button
        type="button"
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </Form>
  );
}
