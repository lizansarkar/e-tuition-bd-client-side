import React, { useState } from "react";
import { Calendar, Clock, ArrowRight, X, User, BookOpen } from "lucide-react";

const Blogs = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const blogData = [
    {
      id: 1,
      title: "How to Choose the Right Tutor for Your Child",
      description:
        "Finding a perfect mentor can be challenging. Learn the key factors to consider before hiring a tutor in Bangladesh, including background checks and teaching style compatibility.",
      content:
        "When selecting a tutor, first assess your child's specific needs. Is it for a particular subject or general guidance? Always check for academic credentials and previous teaching experience. In Bangladesh, word-of-mouth is great, but platforms like eTuitionBD provide verified profiles which add an extra layer of security and trust. Don't forget to have a trial session to see the chemistry between the student and the tutor.",
      category: "Education Tips",
      author: "Admin",
      date: "Jan 10, 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Top 5 Effective Study Techniques for HSC Candidates",
      description:
        "Boost your exam preparation with scientifically proven study methods like Pomodoro and Active Recall.",
      content:
        "HSC is a turning point for students in Bangladesh. To excel, move beyond rote memorization. Use the Pomodoro technique (25 mins study, 5 mins break) to maintain focus. Active Recall involves testing yourself instead of just reading. Mind mapping can help connect complex topics in subjects like Biology or Chemistry. Consistency is the key to mastering the massive HSC syllabus.",
      category: "Study Guide",
      author: "Sara Ahmed",
      date: "Jan 15, 2026",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Building a Career as a Professional Private Tutor",
      description:
        "Private tutoring is more than just teaching. Discover how to build a strong reputation and stable income stream.",
      content:
        "Professional tutoring requires a blend of subject mastery and soft skills. Start by defining your niche—whether it's English medium, Madrasah background, or Science groups. Dress professionally, be punctual, and communicate progress to parents regularly. Your reputation is your biggest asset. High-quality tutoring often leads to referrals, ensuring a steady flow of students.",
      category: "Tutor Growth",
      author: "Tanvir Hasan",
      date: "Jan 18, 2026",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Managing Online Classes: Tips for Teachers and Students",
      description:
        "Digital learning is the new normal. Master the tools and etiquette needed for successful online education sessions.",
      content:
        "Online tutoring offers flexibility but demands discipline. Tutors should use tools like Zoom or Google Meet effectively, utilizing whiteboards and screen sharing. Students should find a quiet corner and minimize distractions. Technical stability—a good internet connection and a working microphone—is non-negotiable for a smooth learning experience.",
      category: "Digital Learning",
      author: "Admin",
      date: "Jan 20, 2026",
      readTime: "4 min read",
      image:
        "https://images.unsplash.com/photo-1588702547319-f55a6dbd7347?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Importance of English Communication in Modern Education",
      description:
        "Why learning English is no longer an option but a necessity for career and academic success globally.",
      content:
        "English is the global language of science and business. For Bangladeshi students, proficiency in English opens doors to international scholarships and MNC jobs. Tutors should focus on speaking and listening, not just grammar. Encouraging students to watch English documentaries or read newspapers can significantly improve their fluency over time.",
      category: "Language Skills",
      author: "Mehedi Joy",
      date: "Jan 22, 2026",
      readTime: "8 min read",
      image:
        "https://images.unsplash.com/photo-1543167664-40d699bc2488?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Mental Health Awareness for Students During Exams",
      description:
        "How to handle exam stress and maintain a healthy mind during the most high-pressure times of the year.",
      content:
        "Exam pressure can lead to severe anxiety. It's crucial for parents and tutors to recognize signs of burnout. Encourage students to take breaks, sleep at least 7 hours, and eat nutritious meals. Meditation and light exercise can help reduce stress levels. Remember, a healthy mind performs better than a stressed one.",
      category: "Well-being",
      author: "Dr. Anika",
      date: "Jan 25, 2026",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1493839523149-2864fca44919?q=80&w=500&auto=format&fit=crop",
    },
  ];

  return (
    <div className="bg-base-200 min-h-screen py-16 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 tracking-tight">
            Latest <span className="text-primary">Educational</span> Insights
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">
            "Knowledge is power. Information is liberating."
          </p>
          <div className="w-24 h-1.5 bg-primary mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogData.map((blog) => (
            <article
              key={blog.id}
              className="group bg-base-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-300 flex flex-col"
            >
              <div className="relative overflow-hidden h-60">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    {blog.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} /> {blog.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-4 text-base-content group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {blog.description}
                </p>

                <div className="mt-auto pt-6 border-t border-base-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs uppercase">
                      {blog.author.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{blog.author}</span>
                  </div>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="flex items-center gap-1 text-primary font-bold text-sm group/btn cursor-pointer hover:underline underline-offset-4"
                  >
                    Read More
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover/btn:translate-x-1"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* --- BLOG DETAIL MODAL --- */}
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Background Overlay with Blur */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity cursor-pointer"
              onClick={() => setSelectedBlog(null)}
            ></div>

            {/* Modal Content */}
            <div className="bg-base-100 w-full max-w-3xl max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-5 right-5 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white md:text-gray-800 transition-all cursor-pointer shadow-lg"
              >
                <X size={24} />
              </button>

              <div className="overflow-y-auto">
                <img
                  src={selectedBlog.image}
                  className="w-full h-72 object-cover"
                  alt={selectedBlog.title}
                />

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                      {selectedBlog.category}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500 font-medium border-l pl-4 border-gray-300">
                      <Calendar size={16} /> {selectedBlog.date}
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-base-content mb-6 leading-tight">
                    {selectedBlog.title}
                  </h2>

                  <div className="flex items-center gap-3 mb-8 p-4 bg-base-200 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl">
                      {selectedBlog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{selectedBlog.author}</p>
                      <p className="text-xs text-gray-500">Expert Educator</p>
                    </div>
                  </div>

                  <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                    <p className="font-semibold text-lg text-base-content">
                      {selectedBlog.description}
                    </p>
                    <p>{selectedBlog.content}</p>
                  </div>

                  <div className="mt-10 pt-8 border-t border-base-200 flex justify-end">
                    <button
                      onClick={() => setSelectedBlog(null)}
                      className="btn btn-primary rounded-full px-8 cursor-pointer shadow-lg hover:shadow-primary/30 transition-all"
                    >
                      Close Article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 p-10 bg-primary rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              Want to share your teaching experience?
            </h3>
            <p className="mb-8 opacity-90 max-w-xl mx-auto italic">
              Help the community grow by sharing your unique educational journey
              and tips.
            </p>
            <button className="bg-white text-primary font-extrabold px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-xl cursor-pointer">
              Apply as a Writer
            </button>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-black/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
