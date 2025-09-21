import React from "react";
import "./BlogCard.css";

interface Blog {
  image: string;
  title: string;
  description: string;
  url: string;
}

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  return (
    <div>
      <div className="container">
        <div className="square">
          <img src={blog.image} alt="blog" className="blog-card-image mask" />
          <div className="blog-card-title">{blog.title}</div>
          <p className="blog-card-subtitle">{blog.description}</p>

          <div>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
