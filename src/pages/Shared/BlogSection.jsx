import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "5 Tips to Extend Asset Lifespan",
      desc: "Learn how predictive maintenance can double the life of your hardware inventory.",
      date: "Oct 24, 2023",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
      category: "Maintenance",
    },
    {
      id: 2,
      title: "The Future of AI in Logistics",
      desc: "How Artificial Intelligence is reshaping the way we track and manage physical assets.",
      date: "Nov 12, 2023",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop",
      category: "Technology",
    },
    {
      id: 3,
      title: "Reducing Ghost Assets by 100%",
      desc: "A case study on how AssetMinder helped a Fortune 500 company save millions.",
      date: "Dec 05, 2023",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      category: "Case Study",
    },
  ];

  return (
    <section className="py-24 bg-base-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="badge badge-primary badge-outline mb-2">
              INSIGHTS
            </div>
            <h2 className="text-4xl font-bold">Latest from Our Blog</h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:flex btn btn-ghost text-primary gap-2"
          >
            View All Posts <FaArrowRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 h-full"
            >
              <figure className="h-48 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 badge badge-secondary font-bold">
                  {blog.category}
                </div>
              </figure>
              <div className="card-body">
                <div className="flex items-center gap-2 text-xs text-base-content/60 mb-2">
                  <FaCalendarAlt /> {blog.date}
                </div>
                <h3 className="card-title text-xl font-bold hover:text-primary transition-colors cursor-pointer">
                  {blog.title}
                </h3>
                <p className="text-base-content/70 text-sm">{blog.desc}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-link px-0 text-primary no-underline hover:underline">
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/blog" className="btn btn-outline btn-primary w-full">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
