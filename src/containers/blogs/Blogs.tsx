import React from "react";
import "./Blog.css";
import BlogCard from "../../components/blogCard/BlogCard";
import { contactPageData } from "../../portfolio";

export default function Blogs(): JSX.Element {
  const blogSection = contactPageData.blogSection;
  return (
    <div className="main" id="blogs">
      <div className="blog-header">
        <h1 className="blog-header-text">{blogSection.title}</h1>
        <p className="subTitle blog-subtitle">{blogSection.subtitle}</p>
      </div>
      <div className="blog-main-div">
        <div className="blog-text-div">
          {/* Blog cards would be mapped here if blogs array existed */}
          <p>No blogs configured yet</p>
        </div>
      </div>
    </div>
  );
}
